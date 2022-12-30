import Head from "next/head";
import Image from "next/image";
import { GraphQLClient, gql } from "graphql-request";
import { Inter } from "@next/font/google";
import styles from "../styles/index.module.scss";
import { Provider } from "react-redux";
import { store } from "./store";
import React, { useState } from "react";
import parse from "html-react-parser";
import classNames from "classnames";
import { Toggle } from "../src/components/toggle/toggle";
import { Blob } from "../src/components/blob/blob";

const inter = Inter({ subsets: ["latin"] });

const graphcms = new GraphQLClient(
  "https://api-us-west-2.hygraph.com/v2/clc5sjmgv0u5201uj992i2hgv/master"
);

const QUERY = gql`
  {
    posts {
      id
      title_en
      title_es
      coverImage {
        url
      }
      date
      content_en
      content_es
      author {
        name
      }
    }
  }
`;

export async function getStaticProps() {
  const { posts } = await graphcms.request(QUERY);
  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}

export default function Home({ posts }: any) {
  const [isSpanish, setIsSpanish] = useState<boolean>(false);

  return (
    <div className={classNames(styles.main)}>
      <Provider store={store}>
        <div className={classNames(styles.container)}>
          <Toggle
            toggleID="LANG"
            label={isSpanish ? "Español" : "English"}
            toggleText={isSpanish ? "ES" : "EN"}
            checked={isSpanish}
            handleChange={(newstatus) => {
              setIsSpanish(newstatus);
            }}
          />
          <Blob />
          {posts.map((post: any) => (
            <div key={post.id} className={classNames(styles.post)}>
              {isSpanish ? (
                <h1 className={classNames(styles.title)}>{post.title_es}</h1>
              ) : (
                <h1 className={classNames(styles.title)}>{post.title_en}</h1>
              )}
              {(isSpanish ? post.content_es : post.content_en).map(
                (content: string) => (
                  <span
                    key={content.slice(0, 10)}
                    className={classNames(styles.content)}
                  >
                    {parse(content)}
                  </span>
                )
              )}
              {/* <Image
                src={post.coverImage.url as string}
                alt="first_picture"
                width={600}
                height={400}
              /> */}
              <div className={classNames(styles.author)}>
                by {post.author.name}
              </div>
              <div className={classNames(styles.date)}>{post.date}</div>
            </div>
          ))}
        </div>
      </Provider>
    </div>
  );
}
