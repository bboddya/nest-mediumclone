import { ArticleEntity } from '../article.entity';

export interface ArticlesResponceInterface {
  articles: ArticleEntity[];
  articlesCount: number;
}
