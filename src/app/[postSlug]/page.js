import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';

import BlogHero from '@/components/BlogHero';
import { loadBlogPost } from '@/helpers/file-helpers';

import styles from './postSlug.module.css';
import { BLOG_TITLE } from '@/constants';
import COMPONENT_MAP from '@/helpers/mdx-components';




const loadPost = React.cache(loadBlogPost);

export async function generateMetadata({params}) {
  const {postSlug} = await params;
  const {frontmatter} = await loadPost(postSlug);

  return {
    title: `${frontmatter.title} - ${BLOG_TITLE}`,
    description: frontmatter.abstract,
  };
}

async function BlogPost({params}) {
  const {postSlug} = await params;
  const {frontmatter, content} = await loadPost(postSlug);
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={content} components={COMPONENT_MAP}/>
      </div>
    </article>
  );
}

export default BlogPost;
