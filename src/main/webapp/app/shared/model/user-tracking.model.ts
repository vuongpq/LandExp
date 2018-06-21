import { Moment } from 'moment';

export const enum UserActivityType {
  USER_SEARCH_BUY = 'USER_SEARCH_BUY',
  USER_SEARCH_RENT = 'USER_SEARCH_RENT',
  USER_VIEW_NEWS = 'USER_VIEW_NEWS',
  USER_LIKE_NEWS = 'USER_LIKE_NEWS',
  USER_CREATE_NEWS = 'USER_CREATE_NEWS',
  USER_UPDATE_NEWS = 'USER_UPDATE_NEWS',
  USER_SUBSCRIPTION = 'USER_SUBSCRIPTION',
  USER_UNSUBSCRIPTION = 'USER_UNSUBSCRIPTION',
  USER_REGISTERED_CONSULTING = 'USER_REGISTERED_CONSULTING',
  USER_UPDATE_SALE_TYPE = 'USER_UPDATE_SALE_TYPE',
  USER_PAID_NEWS = 'USER_PAID_NEWS',
  USER_SOLD_HOUSE = 'USER_SOLD_HOUSE',
  USER_BOUGTH_HOUSE = 'USER_BOUGTH_HOUSE',
  USER_CREATE_BANNER = 'USER_CREATE_BANNER',
  USER_UPDATE_BANNER = 'USER_UPDATE_BANNER'
}

export interface IUserTracking {
  id?: number;
  activityType?: UserActivityType;
  sourceId?: string;
  sourceLink?: string;
  description?: string;
  createAt?: Moment;
  userLogin?: string;
  userId?: number;
}

export const defaultValue: Readonly<IUserTracking> = {};
