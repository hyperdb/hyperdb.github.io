import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { Tooltip } from "@/components/ui/tooltip";

type ContributionDay = {
	contributionCount: number;
	date: string;
	color: string;
	weekday: number;
};

type ContributionWeek = {
	contributionDays: ContributionDay[];
};

type ContributionCalendar = {
	totalContributions: number;
	weeks: ContributionWeek[];
};

type GitHubGraphQLResponse = {
	data?: {
		user?: {
			contributionsCollection?: {
				contributionCalendar?: ContributionCalendar;
			};
		};
	};
	errors?: { message: string }[];
};

type Props = {
	username: string;
	from?: Date;
	to?: Date;
	accessToken?: string;
	title?: string;
};

const DEFAULT_TITLE = "GitHub Contributions";
const DEFAULT_DAY_COUNT = 365;
const CELL_SIZE = 12;

const formatDate = (isoDate: string) => {
	return new Date(isoDate).toLocaleDateString("ja-JP", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
};

const makeDefaultRange = () => {
	const to = new Date();
	const from = new Date();
	from.setDate(to.getDate() - DEFAULT_DAY_COUNT);
	return { from, to };
};

const GitHubContributions = ({
	username,
	from,
	to,
	accessToken,
	title = DEFAULT_TITLE,
}: Props) => {
	const [calendar, setCalendar] = useState<ContributionCalendar | null>(null);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const dateRange = useMemo(() => {
		if (from && to) {
			return { from, to };
		}
		return makeDefaultRange();
	}, [from, to]);

	useEffect(() => {
		const token = accessToken || import.meta.env.VITE_GITHUB_TOKEN;
		if (!token) {
			// eslint-disable-next-line @eslint-react/web-api-no-leaked-timeout
			setTimeout(() => {
				setErrorMessage(
					"GitHub API token was not found. Set VITE_GITHUB_TOKEN or pass accessToken.",
				);
				setCalendar(null);
			}, 0);
			return;
		}

		const controller = new AbortController();

		const loadContributions = async () => {
			setLoading(true);
			setErrorMessage(null);

			const query = `
				query($login: String!, $from: DateTime!, $to: DateTime!) {
					user(login: $login) {
						contributionsCollection(from: $from, to: $to) {
							contributionCalendar {
								totalContributions
								weeks {
									contributionDays {
										contributionCount
										date
										color
										weekday
									}
								}
							}
						}
					}
				}
			`;

			const variables = {
				login: username,
				from: dateRange.from.toISOString(),
				to: dateRange.to.toISOString(),
			};

			try {
				const response = await fetch("https://api.github.com/graphql", {
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ query, variables }),
					signal: controller.signal,
				});

				if (!response.ok) {
					throw new Error(`GitHub API request failed: ${response.status}`);
				}

				const json = (await response.json()) as GitHubGraphQLResponse;

				if (json.errors?.length) {
					throw new Error(json.errors[0].message);
				}

				const resultCalendar =
					json.data?.user?.contributionsCollection?.contributionCalendar ||
					null;
				setCalendar(resultCalendar);
			} catch (error) {
				if ((error as Error).name === "AbortError") {
					return;
				}
				setErrorMessage((error as Error).message);
				setCalendar(null);
			} finally {
				setLoading(false);
			}
		};

		loadContributions();

		return () => {
			controller.abort();
		};
	}, [accessToken, dateRange.from, dateRange.to, username]);

	if (loading) {
		return (
			<Flex alignItems="center" gap={2}>
				<Spinner size="sm" />
				<Text>Loading GitHub contributions...</Text>
			</Flex>
		);
	}

	if (errorMessage) {
		return (
			<Box borderWidth={1} borderRadius={8} p={3}>
				<Text fontWeight="bold">{title}</Text>
				<Text color="red.500" mt={2}>
					{errorMessage}
				</Text>
			</Box>
		);
	}

	if (!calendar) {
		return null;
	}

	return (
		<Box borderWidth={1} borderRadius={8} p={3}>
			<Text fontWeight="bold">{title}</Text>
			<Text fontSize="sm" color="gray.500" mb={3}>
				{calendar.totalContributions} contributions in the selected period
			</Text>
			<Flex overflowX="auto" gap="2px" pb={1}>
				{calendar.weeks.map((week) => {
					const weekKey =
						week.contributionDays[0]?.date ||
						week.contributionDays.map((day) => day.date).join("-");

					return (
						<Flex key={weekKey} direction="column" gap="2px">
							{week.contributionDays.map((day) => {
								const tooltipContent = `${formatDate(day.date)}: ${day.contributionCount} contributions`;

								return (
									<Tooltip
										key={day.date}
										content={tooltipContent}
										positioning={{ placement: "top" }}
										showArrow
									>
										<Box
											w={`${CELL_SIZE}px`}
											h={`${CELL_SIZE}px`}
											borderRadius="2px"
											bg={day.color || "gray.200"}
											borderWidth={day.contributionCount === 0 ? 1 : 0}
											borderColor="gray.300"
											aria-label={tooltipContent}
										/>
									</Tooltip>
								);
							})}
						</Flex>
					);
				})}
			</Flex>
		</Box>
	);
};

export default GitHubContributions;
