---
title: 個人サイト近日公開
tags:
  - react
  - nextjs
  - astro
  - cloudflare-r2
  - emdash
category: サイト作成
description: 
created_at: 2026-05-27T10:46:43.585Z
updated_at: 2026-05-27T10:46:43.585Z
content_type: post
status: published
---

以前から何度も作り直していた個人サイト（[hyperdb.jp](https://hyperdb.jp)）ですが何となく形になりそうです。

最初はReactの練習用に作リ始めてからNext.js・Astroと移行しながら最終的にまたReactに戻りました。元々、当時の仕事がPHPばかりだったのでいろいろやってみたかったというノリも多少あるのですが、個人的にはReactが一番フィットしたのかもしれません。

一番最初にReactで作ったものとの違いは、当初`/src/contents/`に置いていたコンテンツデータをClaudflare R2に配置することにしたということでしょうか。コンテンツの作成・管理する部分は独立した別のプロジェクトにしてマークダウンの生成からCloudflare R2へのアップロードまでを行っています。その辺はそれなりに経験値が上がって、できることが増えたと思っておくことにします。

今後はこのサイトを作成した時の知見も活かして別の趣味のサイトでも作っていこうと考えています。そのなかで最近少し気になっているEmDashも使ってみたいなと思っています。
