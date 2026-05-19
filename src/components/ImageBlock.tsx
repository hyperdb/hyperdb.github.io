import { Container, Flex, Image } from "@chakra-ui/react";

interface ImageBlockProps {
	src: string;
	alt: string;
	radius?: string;
	maxWidth?: string;
	maxHeight?: string;
	justify?: string;
}

const ImageBlock = (props: ImageBlockProps) => {
	return (
		<Container fluid>
			<Flex justify={props.justify || "center"} align={"center"} my={16}>
				<Image
					src={props.src}
					alt={props.alt}
					borderRadius={props.radius || "none"}
					maxWidth={props.maxWidth}
					maxHeight={props.maxHeight}
				/>
			</Flex>
		</Container>
	);
};
export default ImageBlock;
