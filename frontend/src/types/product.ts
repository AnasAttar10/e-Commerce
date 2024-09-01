export interface IProduct {
  id: string;
  title: string;
  price: number;
  cat_prefix?: string;
  img: string;
  max?: number;
  quantity?: number;
  isLiked?: boolean;
  showLikeIcon?: boolean;
  showReachedMaxMessage?: boolean;
  showButton?: boolean;
  showQuantity?: boolean;
}
