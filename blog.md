# API методы для блога {docsify-ignore-all}

## Доступ к создание канала

**URL**: ```/api/v1/userfeed/channel/{user_id}```

**Method**: PUT

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|user_id|int|required|ID пользователя|
|is_activate|boolean|required|Дать доступ (`true`, `false`)|

> user_id является первичным ключом в таблице каналов (feed_channels)

#### ** Пример запроса **

```
{
    "user_id": 106,
    "is_activate": true
}
```
#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|status|string|Состояние запроса|

#### ** Пример ответа **

```
{
    "status": "success",
}
```
или

```
{
   "status" : "failure"
}
```

<!-- tabs:end -->



## Значок верификации автора публикаций

**URL**: ```api/v1/userfeed/user/{user_id}/verify```

**Method**: POST

**URL**: ```api/v1/userfeed/user/{user_id}/unverify```

**Method**: DELETE

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|user_id|int|required|ID пользователя|

> user_id являеться первичным ключом в таблице каналов (feed_channels)

#### ** Пример запроса **

```
{
    "user_id": 106,
}
```
#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|status|string|Состояние запроса|

#### ** Пример ответа **

```
{
    "status": "success",
}
```
или

```
{
   "status" : "failure"
}
```

<!-- tabs:end -->


## Подписаться на канал

**URL**: ```/api/v1/userfeed/channel/{channel_id}/subscribe```

**Method**: POST

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|channel_id|int|required|ID канала (пользователя)|

> user_id является первичным ключом в таблице каналов (feed_channels)
>
> т.е. user_id и есть channel_id

#### ** Пример запроса **

```
{
    "channel_id": 106,
}
```
#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|data|object|Подписчики и их количество|
|data.count|int|Количество|
|data.subscribers|array|Подписчики|
|status|object|Состояние запроса|

#### ** Пример ответа **

```
{
    "data": [
        {
            "id": 8,
            "name": "msderN",
            "media": {
                "avatar": "",
                "banner": ""
            },
            "is_verified": false
        }
    ],
    "meta": {
        "subscribers_count": 1
    },
    "status": "success"
}
```

<!-- tabs:end -->

## Отписаться от канала

**URL**: ```/api/v1/userfeed/channel/{channel_id}/subscribe```

**Method**: DELETE

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|channel_id|int|required|ID канала (пользователя)|

> user_id является первичным ключом в таблице каналов (feed_channels)
>
> т.е. user_id и есть channel_id

#### ** Пример запроса **

```
{
    "channel_id": 106,
}
```
#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|data|object|Подписчики и их количество|
|data.count|int|Количество|
|data.subscribers|array|Подписчики|
|status|object|Состояние запроса|

#### ** Пример ответа **

```
{
    "data": {
        "count": 1,
        "subscribers": [
            {
                "id": 106,
                "name": "Trusted",
                "media": {
                    "avatar": "",
                    "banner": ""
                }
            }
        ]
    },
    "status": "success"
}
```

<!-- tabs:end -->


## Информация о канале

**URL**: ```/api/v1/userfeed/channel/{channel_id}```

**Method**: GET

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|channel_id|int|required|ID канала (пользователя)|

> user_id является первичным ключом в таблице каналов (feed_channels)
>
> т.е. user_id и есть channel_id

#### ** Пример запроса **

```
{
    "channel_id": 106,
}
```
#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|data|object|Подписчики и их количество|
|data.is_enabled|boolean|Активный канал или нет|
|data.subscribers|int|Подписчики|
|data.subscribed|boolean|Текущий пользователь подписан или нет|
|data.is_verified|boolean|Автор верифицирован или нет|
|status|object|Состояние запроса|

#### ** Пример ответа **

```
{
    "data": {
        "id": 106,
        "is_enabled": true,
        "subscribers": 1,
        "is_subscribed": true,
        has_subscribe: false,
        has_unsubscribe: true,
        is_muted: true,
        "is_verified": 1,
        "user": {
            "id": 106,
            "name": "Trusted",
            "media": {
                "avatar": "",
                "banner": ""
            }
        } 
    },
    "status": "success"
}
```

<!-- tabs:end -->


## Показать все посты в канале

**URL**: ```/api/v1/userfeed/channel/{channel_id}/post```

**Method**: GET

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|channel_id|int|required|ID канала (пользователя)|
|offset|int|required|Загрузить частично|

#### ** Пример запроса **

```
{
    "channel_id": 106,
    "offset": 10
}
```
#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|data|object|Посты в канакле|
|status|string|Состояние запроса|

#### ** Пример ответа **

```
{
    "data": [
        {
            "id": 7,
            "channel_id": 106,
            "title": "test title",
            "slug": "test-title",
            "short_description": "test short_description",
            "description": "<p>test description </p>\n",
            "seo": {
                "meta_title": "meta title",
                "meta_description": "meta description",
                "meta_keywords": "meta keywords"
            },
            "created_at": "2021-10-25T16:01:35.000000Z",
            "user": {
                "id": 106,
                "name": "Trusted",
                "media": {
                    "avatar": "",
                    "banner": ""
                }
            },
            "viewed": 3,
            "current_reacted": "like"
            "reactions": {
                "like": 1,
                "dislike": 0
            },
            "tag": {
                "id": 40,
                "namespace": "биткоин",
                "slug": "bitcoin",
                "name": "биткоин",
                "count": 0,
                "is_popular": 1
            }
        }
    ],
    "status": 200
}
```

<!-- tabs:end -->


## Показать все посты в "Ленте" пользователя

**URL**: ```api/v1/userfeed/feed```

**Method**: GET

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|offset|int||Загрузить частично|
|limit|int||Загрузить частично|
|search|string||Поиск по статьям (поиск осуществляется по названию, описанияю, краткому описанию)|
|filter[type]|string|required|Поиск по типу (`personal`, `popular`, `fresh`)|
|filter[tag_id]|string||Поиск по тегу|

>personal = моя лента, 
>popular = популярное, 
>fresh = свежее, 

#### ** Пример запроса **

```
{
    "offset": 0,
    "search": "Example title"
    "filter[type]": "personal"
    "filter[tag_id]": 3
}
```
#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|data|object|Посты в ленте|
|status|string|Состояние запроса|

#### ** Пример ответа **

```
{
    "data": [
        {
            "id": 440,
            "channel_id": 106,
            "title": "public post",
            "slug": "public-post-5",
            "short_description": "test short_description",
            "description": "<p>aaaaaa</p>",
            "seo": {
                "meta_title": "meta title",
                "meta_description": "meta description",
                "meta_keywords": "meta keywords"," * ignoreMissing": false," * exceptKeys": []," * onlyKeys": []
            },
            "created_at": "2021-11-09T10:16:48.000000Z",
            "user": {
                "id": 106,
                "login": "OliverBlack",
                "name": "Trusted",
                "media": {
                    "avatar": "http://tor2coin.loc/storage/media/207/8_avatar_1631730265.png",
                    "banner": ""
                },
                "is_verified": true
            },
            "has_update": true,
            "has_delete": true,
            "viewed": 0,
            "reactions": {
                "like": 0,
                "dislike": 0
            },
            "current_reacted": "",
            "last_modified": "",
            "can_comment": true,
            "comments_count": 0,
            "cover": "",
            "tag": {
                "id": 41,
                "namespace": "электронные-деньги",
                "slug": "electronic-money",
                "name": "электронные деньги",
                "count": 0,
                "is_popular": 0
            }
        }
    ],
    "meta": {
        "paginate": {
            "total": 1,
            "offset": 0,
            "limit": 1
        }
    },
    "status": "success"
}
```

<!-- tabs:end -->


## Получить статью на канале пользователя (by id)

**URL**: ```/api/v1/userfeed/channel/{channel_id}/post/{post_id}```

**Method**: GET

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|channel_id|int|required|ID канала (пользователя)|
|post_id|int|required|ID поста|

#### ** Пример запроса **

```
{
    "channel_id": 106,
    "post_id": 120
}
```
#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|data|object|Посты в канакле|
|status|string|Состояние запроса|

#### ** Пример ответа **

```
{
    "data": {
        "id": 119,
        "channel_id": 106,
        "title": "test title",
        "slug": "test-title-2",
        "short_description": "test short_description",
        "description": "<p>s </p>",
        "seo": {
            "meta_title": "meta title",
            "meta_description": "meta description",
            "meta_keywords": "meta keywords"
        },
        "created_at": "15 минут назад",
        "user": {
            "id": 106,
            "name": "Trusted",
            "media": {
                "avatar": "",
                "banner": ""
            }
        },
        "viewed": 4,
       "reactions": {
            "like": 1,
            "dislike": 0
        },
       "current_reacted": "like",
       "tag": {
            "id": 40,
            "namespace": "биткоин",
            "slug": "bitcoin",
            "name": "биткоин",
            "count": 0,
            "is_popular": 1
        }
    },
    "status": "success"
}
```

<!-- tabs:end -->


## Получить статью на канале пользователя (by id or by slug)

**URL**: ```/api/v1/userfeed/post/{idOrSlug}```

**Method**: GET

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|idOrSlug|int|required|ID или slug поста)|

#### ** Пример запроса **

```
{
    "idOrSlug": test-title-2,
}
```
#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|data|object|Посты в канакле|
|status|string|Состояние запроса|

#### ** Пример ответа **

```
{
    "data": {
        "id": 119,
        "channel_id": 106,
        "title": "test title",
        "slug": "test-title-2",
        "short_description": "test short_description",
        "description": "<p>s </p>",
        "seo": {
            "meta_title": "meta title",
            "meta_description": "meta description",
            "meta_keywords": "meta keywords"
        },
        "created_at": "15 минут назад",
        "user": {
            "id": 106,
            "name": "Trusted",
            "media": {
                "avatar": "",
                "banner": ""
            }
        },
        "viewed": 4,
       "reactions": {
            "like": 0,
            "dislike": 0
        },
       "current_reacted": "like",
       "tag": {
            "id": 40,
            "namespace": "биткоин",
            "slug": "bitcoin",
            "name": "биткоин",
            "count": 0,
            "is_popular": 1
        }
    },
    "status": "success"
}
```

<!-- tabs:end -->


## Создание автором поста в своем канале

**URL**: ```/api/v1/userfeed/channel/{channel_id}/post```

**Method**: POST

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|channel_id|int|required|ID чата|
|title|string|required|заголовок поста|
|short_description|string|required|краткое описание поста|
|description|string|required|основной текст|
|seo[meta_description]|array||мета-описание страницы|
|seo[meta_keywords]|array||ключевые слова|
|seo[meta_title]|array||SEO заголовок страницы|
|cover|string||uuid загруженного картинки превью|
|tag|integer||ID тега|
|private[type]|integer|required if private|Тип доступности|
|private[cost]|integer|required when (`one_time`, `both`)|Цена|
|private[currency]|integer|required with cost|Символ валюты|

> Типы доступности one_time, subscription, both 
>
> Тип subscription не требует указание цены и валюты

#### ** Пример запроса **
```
{
    "channel_id": 106,
    "title": "test",
    "short_description": "test",
    "description": "test",
    "seo[meta_description]": "test",
    "cover": "9028259d-76f5-407b-b33b-ce9a76634fd3",
    "private[type]": "one_time",
    "private[cost]": 21,
    "private[currency]": "USD",
}
```

#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|data|object|созданный пост|
|status|string|состояние запроса|

#### ** Пример ответа **

```
{
    "data": {
        "id": 7,
        "channel_id": "106",
        "title": "test title",
        "slug": "test-title",
        "short_description": "2021-08-11T09:37:53.000000Z",
        "description": "test description",
        "cover": "http://tor2coin.loc/storage/media/43/Screenshot-(3).png"
        "seo": {
            "meta_title": "meta title",
            "meta_description": "meta description",
            "meta_keywords": "meta keywords"
        },
         "tag": {
            "id": 41,
            "namespace": "электронные-деньги",
            "slug": "electronic-money",
            "name": "электронные деньги",
            "count": 0,
            "is_popular": 0
        }
    },
    "status": "success"
}
```

<!-- tabs:end -->

## Удаление поста

**URL**: ```/api/v1/userfeed/channel/{channelId}/post/{postId}```

**Method**: DELETE

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|channel_id|int||ID чата|
|post_id|int||ID поста|

#### ** Пример запроса **
```
{
  
}
```

#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|status|string|состояние запроса|

#### ** Пример ответа **

```
{
    "status": "success",
}
```
или

```
{
   "status" : "failure"
}
```

<!-- tabs:end -->


## Обновление поста

**URL**: ```api/v1/userfeed/channel/{channel_id}/post/{post_id} ```

**Method**: PATCH

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|channel_id|int||ID чата|
|post_id|int||ID поста|
|title|string||заголовок поста|
|short_description|string||краткое описание поста|
|description|string||основной текст|
|seo[meta_description]|array||мета-описание страницы|
|seo[meta_keywords]|array||ключевые слова|
|seo[meta_title]|array||SEO заголовок страницы|
|cover|string|uuid загруженного картинки превью|
|tag|integer||ID тега|

>Когда cover в запросе нету, то с картинкой превью ничего не делается
>Когда в запросе вставлена правильная uuid загружанной картинки превью, тогда превью вставляется или обнавляется
>Когда в запросе вставлена пустая строка или null, тогда картинка превью удаляется 

#### ** Пример запроса **
```
{
    "channel_id": 106,
    "title": "test",
    "short_description": "test",
    "description": "test",
    "seo[meta_description]": "test",
    "cover": "9028259d-76f5-407b-b33b-ce9a76634fd3"
}
```

#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|data|object|созданный пост|
|status|string|состояние запроса|

#### ** Пример ответа **

```
{
    "data": {
        "id": 14,
        "channel_id": "106",
        "title": "sweet title",
        "short_description": "test short_description",
        "description": "test description",
        "cover": "http://tor2coin.loc/storage/media/43/Screenshot-(3).png"
        "seo": {
            "meta_title": "meta title",
            "meta_description": "meta description",
            "meta_keywords": "meta keywords"
        },
        "tag": {
            "id": 40,
            "namespace": "биткоин",
            "slug": "bitcoin",
            "name": "биткоин",
            "count": 0,
            "is_popular": 1
        }
    },
    "status": "success"
}
```

<!-- tabs:end -->


## Загрузка картинки для эдитора/превью поста

**URL**: ```/api/v1/userfeed/post/image```

**Method**: POST

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|image|image|required|изображение из ввода input|
|type|string|тип картинки|

>Когда загружаем картинку превью, обязательно нужно указать "type": "cover" в запросе

#### ** Пример запроса **
```
{
    "image": IMAGE,
    "type": "cover"
}
```

#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|id|int|ид сохраненной картинки |
|url|string|урл загруженной картинки |
|status|string|состояние запроса|

#### ** Пример ответа **

```
{
    "id": 48,
    "url": "http://tor2coin.loc/storage/editor/QPqoY3skYoLUkUerwIV0rIIZ6ZkiSvZtWO9vPtPy.png",
    "status": "success"
}
```

или

```
{
  "status": "failure"
}

```
<!-- tabs:end -->


## Поставить лайк/дизлайк

**URL**: ```/api/v1/userfeed/post/like```

**URL**: ```/api/v1/userfeed/post/dislike```

**Method**: POST

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|post_id|int|required|ID поста

#### ** Пример запроса **
```
{
    "post_id": 7,
}
```

#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|count|int|Кколичество лайков и дизлайков к посту|
|status|string|состояние запроса|

#### ** Пример ответа **

```
{
    "data": {
        "count": {
            "like": 1,
            "dislike": 1
        }
    }
}
```
<!-- tabs:end -->


## Жалоба пользователя на пост

**URL**: ```/api/v1/userfeed/complaint```

**Method**: POST

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|channel_post_id|int|required|ID поста|
|type_id|int|required|ID типа жалобы|
|description|string|required|Причина|
|user_id|string|required|ID пользователя|

>Когда выбран тип "другое", нужно указать причину (description)

#### ** Пример запроса **
```
{

    "type_id": 1,
    "user_id": 1061,
    "description": 'the reason',
}
```

#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|count|int|Кколичество лайков и дизлайков к посту|
|status|string|состояние запроса|

#### ** Пример ответа **

```
{
    "data": {
        "id": 56,
        "type_id": "1",
        "description": null,
        "post_id": 259
    },
    "meta": [],
    "status": "success"
}
```
<!-- tabs:end -->


## Просмотреть жалобы

**URL**: ```api/v1/userfeed/complaint-post```

**Method**: GET

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|offset|int|required|Загрузить частично|
|limit|int||Лимит выборки на страницу(по умолчанию: 10)|
|filter[status]|string||фильтры (`new`, `in_progress`, `resolved`)|
|filter[user_id]|integer||фильтр по идентификатору пользователя|

#### ** Пример запроса **
```
{
    "offset": 7,
    "filter": {
        "status": "new",
        "user_id": 1
    }
}
```

#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|data|object|Жалобы пользователей|
|data.*.id|int|Идентификатор запроса|
|data.*.status|string|Статус заявки|
|data.*.complaint_request_status|string|Статус заявки (Deprecated)|
|data.*.delete_reason|string|Причина удаления|
|data.*.created_at|string|Дата и время регистрации заявки|
|data.*.complaints_count|int|Сумма жалоб|
|data.*.user|object|Исполнитель по заявке (если null то у заявки еще нет испольнителя)|
|data.*.complaints_types|array|Уникальный список типов жалоб по заявке|
|data.*.post|object|Пост по заявке (если null то пост был уже удален)|
|status|string|состояние запроса|
|meta|object|Мета инфомация запроса|
|meta.totals|object|Счетчики вкладок|
|meta.totals.new|int|Счетчик вкладки "Новое"|
|meta.totals.in_progress|int|Счетчик вкладки "В процессе"|
|meta.totals.resolved|int|Счетчик вкладки "Завершена"|
|meta.totals.all|int|Счетчик вкладки "Все"|
|meta.totals.user|int|Счетчик вкладки "Мои"|
|meta.paginate|object|Информация по постраничной навигации|
|meta.paginate.total|int|Всего записей в выборке без учета номера страницы|
|meta.paginate.offset|int|Пропущено записей|
|meta.paginate.limit|int|Лимит выборки|

#### ** Пример ответа **

```
{
    "data": [
        {
            "id": 10,
            "slug": "sweet-shisadt",
            "status": "resolved",
            "complaint_request_status": "resolved",
            "delete_reason": "be happy",
            "created_at": "2021-10-01T13:19:07.000000Z",
            "user": {
                "id": 1,
                "login": "190823Pareto",
                "name": "R.Nixon",
                "media": {
                  "avatar": "",
                  "banner": ""
                },
                "is_verified": false
            }
            "complaints_types": [
                {
                    "id": 1,
                    "type": "spam",
                    "name": "Спам",
                    "has_free": false
                },
                {
                    "id": 1,
                    "type": "spam",
                    "name": "Спам",
                    "has_free": false
                },
                {
                    "id": 1,
                    "type": "spam",
                    "name": "Спам",
                    "has_free": false
                }
            ],
            "post": {
                "id": 259,
                "channel_id": 106,
                "title": "sweet shasdit",
                "slug": "sweet-shisadt",
                "short_description": "test short_description 4",
                "description": "<p>test description4</p>",
                "seo": {
                    "meta_title": null,
                    "meta_description": "''",
                    "meta_keywords": null," * ignoreMissing": false," * exceptKeys": []," * onlyKeys": []
                },
                "created_at": "2021-09-13T14:00:07.000000Z",
                "user": {
                    "id": 106,
                    "login": "OliverBlack",
                    "name": "Trusted",
                    "media": {
                        "avatar": "http://tor2coin.loc/storage/media/207/8_avatar_1631730265.png",
                        "banner": ""
                    },
                    "is_verified": true
                },
                "has_update": true,
                "has_delete": true,
                "viewed": 12,
                "reactions": {
                    "like": 0,
                    "dislike": 0
                },
                "current_reacted": "",
                "last_modified": "admin"
            }
        }
    ],
    "meta": {
        "totals": {
            "new": 1,
            "in_progress": 0,
            "resolved": 4,
            "all": 5,
            "user": 0
        },
        "paginate": {
            "total": 5,
            "offset": 4,
            "limit": 10
        }
    }
}
```
<!-- tabs:end -->


## Обновление статуса жалобы администратором

**URL**: ```/api/v1/userfeed/complaint-post/{post_id}```

**Method**: PATCH

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|post_id|int|required|ID поста |
|status|string|required|Статус жалобы (`new`, `in_progress`, `resolved`).|

> При установке статуса в in_progress, сервер установит текущего пользователя как исполнителя

#### ** Пример запроса **
```
{
    "status": "resolved"
}
```

#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|status|string|состояние запроса|

#### ** Пример ответа **

```
{
  "status":"success"
}
  
```
или
```
{
  "status":"failed"
}
  
```
<!-- tabs:end -->


## Удаления жалобы администратором(поста)

**URL**: ```/api/v1/userfeed/complaint-post/{post_id}```

**Method**: DELETE

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|post_id|int|required|ID поста|
|delete_reason|string|required|Причина удаления|

#### ** Пример запроса **
```
{
    "status": "resolved"
}
```

#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|status|string|состояние запроса|

#### ** Пример ответа **

```
{
  "status":"success"
}
  
```
или
```
{
  "status":"failed"
}
  
```
<!-- tabs:end -->


## Жалобы поста

**URL**: ```/api/v1/userfeed/complaint-post/{complaintPostId}/complaint```

**Method**: GET

<!-- tabs:start -->


#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|complaintPostId|int|required|ID заявки на модерацию|

> Еще надо делать запрос для получения информации поста

#### ** Пример запроса **
```
{
   "post_id": 247
}
```

#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|data|object|Все типы жалоб|
|status|string|состояние запроса|

#### ** Пример ответа **

```
{
    "data": [
        {
            "id": 28,
            "user_id": 106,
            "user_name": "Trusted",
            "type": "other",
            "other_description": "some funny description",
            "post_id": 247,
            "created_at": "2021-09-08T10:14:59.000000Z"
        }
    ],
    "status": "success"
}
  
```

<!-- tabs:end -->


## Типы жалоб

**URL**: ```/api/v1/userfeed/complaint-type```

**Method**: GET

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|


#### ** Пример запроса **
```
{
   
}
```

#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|data|object|Все типы жалоб|
|data.*.id|int|Идентификатор типа жалобы|
|data.*.type|string|Канонический тип жалобы|
|data.*.name|string|Наименование типа жалобы|
|data.*.has_free|boolean|Отображать форму свободного ввода|
|status|string|состояние запроса|

#### ** Пример ответа **

```
{
    "data": [
        {
            "id": 1,
            "type": "spam",
            "name": "Спам",
            "has_free": false
        },
        {
            "id": 2,
            "type": "violence",
            "name": "Насилие",
            "has_free": false
        },
        {
            "id": 3,
            "type": "pornography",
            "name": "Порнография",
            "has_free": false
        },
        {
            "id": 4,
            "type": "unauthorized_trade",
            "name": "Несанкционированная Торговля",
            "has_free": false
        },
        {
            "id": 5,
            "type": "other",
            "name": "Другое",
            "has_free": true
        }
    ],
    "status": "success"
}
  
```

<!-- tabs:end -->


## Просмотреть мои подписки

**URL**: ```/api/v1/userfeed/favorite-channels```

**Method**: GET

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|offset|int||Загрузить частично|
|limit|int||Лимит записей на страницу|
|search|string|Поисковая строка|


#### ** Пример запроса **
```
{
   "offset": 0
}
```

#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|data|object|Все подписки|
|status|string|состояние запроса|
|meta|object|Мета данные запроса|
|meta.pagination|object|Пагинация запроса|
|meta.pagination.total|int|Всего элементов в запросе до которых возможен offset|
|meta.pagination.offset|int|Текущий offset|
|meta.pagination.limit|int|Лимит элементов на страницу. (Максимум: 50, По умолчанию: 10)|
#### ** Пример ответа **

```
{
    "data": [
        {
            "id": 106,
            "is_enabled": true,
            "subscribers": 1,
            "is_subscribed": true,
            "is_verified": 1,
            "user": {
                "id": 106,
                "name": "Trusted",
                "media": {
                    "avatar": "",
                    "banner": ""
                }
            } 
        }
        ...
    ],
    "status": "success",
    "meta": {
        "paginate": {
          "total": 1,
          "offset": 0,
          "limit": 10
        }
      }
}
  
```

<!-- tabs:end -->


## выключить/включить уведомления от канала

**URL**: ```/api/v1/userfeed/channel/{channel_id}/mute```

**Method**: GET

**URL**: ```/api/v1/userfeed/channel/{channel_id}/mute```

**Method**: POST

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|channel_id|int|required|ID канала|

#### ** Пример запроса **
```
{
   "channel_id": 106
}
```

#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|

#### ** Пример ответа **

```
{
    "status": "success",
}
```

<!-- tabs:end -->

## Просмотреть список своих подписчиков

**URL**: ```/api/v1/userfeed/channel/{channel_id}/subscribers```

**Method**: GET

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|channel_id|int|required|ID канала|
|offset|int||офсет постранички|
|limit|int||лимит постранички|
|search|int||поиск по колонку name|
|filter[some_filter]|int|required|ID канала|

#### ** Пример запроса **
```
{
   "channel_id": 106
}
```

#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|

#### ** Пример ответа **

```
{
        "data": [
        {
            "id": 319,
            "login": "Evgen4ik15",
            "name": "s0do100za5sec",
            "media": {
                "avatar": "",
                "banner": ""
            },
            "is_verified": false,
            "channel": {
                "id": 319,
                "is_enabled": false,
                "subscribers": 0,
                "is_subscribed": false,
                "is_verified": false,
                "user": {
                    "id": 319,
                    "login": "Evgen4ik15",
                    "name": "s0do100za5sec",
                    "media": {
                        "avatar": "",
                        "banner": ""
                    },
                    "is_verified": false
                },
                "has_subscribe": true,
                "has_unsubscribe": false
            }
        }
    ],
    "status": "success",
    "meta": {
        "paginate": {
            "total": 3,
            "offset": 0,
            "limit": 1
        }
    }
}
```

<!-- tabs:end -->



## Установить/обновить стоимость платной подписки

**URL**: ```/api/v1/userfeed/channel/{channel_id}/plan```

**Method**: POST

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|channel_id|int|required|ID канала|
|price[monthly][cost]|int|required|Цена тарифа|
|price[monthly][currency]|int|required|Валюта (`USD`, `RUB`)|

> Тарифы (`monthly`, `three_months`, `six_months`, `yearly`)

#### ** Пример запроса **
```
{
    "channel_id": 106,
    "price[monthly][cost]" : 15,
    "price[monthly][currency]" : "USD",
}
```

#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|

#### ** Пример ответа **

```
{
    "data": {
        "monthly": {
            "id": 79,
            "price": {
                "currency": "USD",
                "cost": 15
            },
            "channel_id": 106,
            "updated_at": "2021-10-20T09:46:06.000000Z"
        },
        "yearly": {
            "id": 80,
            "price": {
                "currency": "USD",
                "cost": 150
            },
            "channel_id": 106,
            "updated_at": "2021-10-20T09:46:06.000000Z"
        }
    },
    "status": "success"
}
```

<!-- tabs:end -->


## Посмотреть тарифы канала

**URL**: ```/api/v1/userfeed/channel/{channel_id}/plan```

**Method**: GET

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|channel_id|int|required|ID канала|

#### ** Пример запроса **
```
{
   "channel_id": 106,
}
```

#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|data|object|Посты в канакле|
|status|string|Состояние запроса|

#### ** Пример ответа **

```
{
    "data": [
        {
            "id": 79,
            "price": {
                "cost": 15,
                "currency": "USD"
            },
            "channel_id": 106,
            "updated_at": "2021-10-20T09:46:06.000000Z"
        },
        {
            "id": 80,
            "price": {
                "cost": 150,
                "currency": "USD"
            },
            "channel_id": 106,
            "updated_at": "2021-10-20T09:46:06.000000Z"
        }
    ],
    "status": "success"
}
```

<!-- tabs:end -->


## Посмотреть конкретный тариф

**URL**: ```/api/v1/userfeed/channel/{channel_id}/plan/{plan_id}```

**Method**: GET

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|channel_id|int|required|ID канала|
|plan_id|int|required|ID тарифа|

#### ** Пример запроса **
```
{
   "channel_id": 106,
   "plan_id": 80
}
```

#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|data|object|Посты в канакле|
|status|string|Состояние запроса|

#### ** Пример ответа **

```
{
    "data": {
        "id": 80,
        "price": {
            "cost": 150,
            "currency": "USD"
        },
        "channel_id": 106,
        "updated_at": "2021-10-20T09:46:06.000000Z"
    },
    "meta": [],
    "status": "success"
}
```

<!-- tabs:end -->



## Удалить тариф

**URL**: ```/api/v1/userfeed/channel/{channel_id}/plan/{plan_id}```

**Method**: DELETE

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|channel_id|int|required|ID канала|
|plan_id|int|required|ID тарифа|

#### ** Пример запроса **
```
{
   "channel_id": 106,
   "plan_id": 80
}
```

#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|data|object|Посты в канакле|
|status|string|Состояние запроса|

#### ** Пример ответа **

```
{
    "status": "success",
}
```

<!-- tabs:end -->


## Посмотреть теги

**URL**: ```/api/v1/userfeed/tag```

**Method**: GET

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|limit|int||Для мапинации|
|offset|int||Для мапинации|
|filter[popular]|boolean||Загрузить только популярные|

#### ** Пример запроса **
```
{
   "filter[popular]": true
}
```

#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|data|object|Посты в канакле|
|status|string|Состояние запроса|

#### ** Пример ответа **

```
{
    "data": [
        {
            "id": 40,
            "namespace": "биткоин",
            "slug": "bitcoin",
            "name": "биткоин",
            "count": 0,
            "is_popular": 1
        }
    ],
    "meta": {
        "paginate": {
            "total": 1,
            "offset": 0,
            "limit": 1
        }
    },
    "status": "success"
}
```

<!-- tabs:end -->


## Установить одноразовый доступность поста

**URL**: ```/api/v1/userfeed/one-time-subscription```

**Method**: POST

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|post_id|int|required|ID поста |

#### ** Пример запроса **
```
{
   "channel_id": 321
}
```

#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|data|object|Посты в канакле|
|status|string|Состояние запроса|

#### ** Пример ответа **

```
{
    "data": {
        "post": {
            "id": 396,
            "channel_id": 106,
            "title": "admin admin",
            "slug": "admin-admin",
            "short_description": "test short_description",
            "description": "<p>aaaaaa</p>",
            "seo": {
                "meta_title": null,
                "meta_description": null,
                "meta_keywords": null
            },
            "created_at": "2021-10-27T13:57:41.000000Z",
            "user": {
                "id": 106,
                "login": "OliverBlack",
                "name": "Trusted",
                "media": {
                    "avatar": "http://tor2coin.loc/storage/media/207/8_avatar_1631730265.png",
                    "banner": ""
                },
                "is_verified": true
            },
            "has_update": true,
            "has_delete": true,
            "viewed": 0,
            "reactions": {
                "like": 0,
                "dislike": 0
            },
            "current_reacted": "",
            "last_modified": "user",
            "cover": "",
            "is_private": 1,
            "can_comment": true,
            "comments_count": 0,
            "private": {
                "type": "both",
                "price": {
                    "cost": 20,
                    "currency": "USD"
                }
            }
        },
        "user": {
            "id": 106,
            "login": "OliverBlack",
            "name": "Trusted",
            "media": {
                "avatar": "http://tor2coin.loc/storage/media/207/8_avatar_1631730265.png",
                "banner": ""
            },
            "is_verified": true
        },
        "channel": {
            "id": 106,
            "is_enabled": true,
            "subscribers": 3,
            "is_subscribed": false,
            "is_verified": true,
            "user": {
                "id": 106,
                "login": "OliverBlack",
                "name": "Trusted",
                "media": {
                    "avatar": "http://tor2coin.loc/storage/media/207/8_avatar_1631730265.png",
                    "banner": ""
                },
                "is_verified": true
            },
            "has_subscribe": true,
            "has_unsubscribe": false,
            "is_muted": false
        },
        "price": {
            "cost": 20,
            "currency": "USD"
        },
        "subscribed_at": "2021-10-27T14:33:07.000000Z"
    },
    "meta": [],
    "status": "success"
}
```

<!-- tabs:end -->


## Посмотреть одноразовые доступы приватных постов

**URL**: ```/api/v1/userfeed/one-time-subscription```

**Method**: GET

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|

#### ** Пример запроса **
```
{
   
}
```

#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|data|object|Посты в канакле|
|status|string|Состояние запроса|

#### ** Пример ответа **

```
{
    "data": [
        {
            "post": {
                "id": 396,
                "channel_id": 106,
                "title": "admin admin",
                "slug": "admin-admin",
                "short_description": "test short_description",
                "description": "<p>aaaaaa</p>",
                "seo": {
                    "meta_title": null,
                    "meta_description": null,
                    "meta_keywords": null
                },
                "created_at": "2021-10-27T13:57:41.000000Z",
                "user": {
                    "id": 106,
                    "login": "OliverBlack",
                    "name": "Trusted",
                    "media": {
                        "avatar": "http://tor2coin.loc/storage/media/207/8_avatar_1631730265.png",
                        "banner": ""
                    },
                    "is_verified": true
                },
                "has_update": true,
                "has_delete": true,
                "viewed": 0,
                "reactions": {
                    "like": 0,
                    "dislike": 0
                },
                "current_reacted": "",
                "last_modified": "user",
                "cover": "",
                "is_private": 1,
                "can_comment": true,
                "comments_count": 0,
                "private": {
                    "type": "both",
                    "price": {
                        "cost": 20,
                        "currency": "USD"
                    }
                }
            },
            "user": {
                "id": 106,
                "login": "OliverBlack",
                "name": "Trusted",
                "media": {
                    "avatar": "http://tor2coin.loc/storage/media/207/8_avatar_1631730265.png",
                    "banner": ""
                },
                "is_verified": true
            },
            "channel": {
                "id": 106,
                "is_enabled": true,
                "subscribers": 3,
                "is_subscribed": false,
                "is_verified": true,
                "user": {
                    "id": 106,
                    "login": "OliverBlack",
                    "name": "Trusted",
                    "media": {
                        "avatar": "http://tor2coin.loc/storage/media/207/8_avatar_1631730265.png",
                        "banner": ""
                    },
                    "is_verified": true
                },
                "has_subscribe": true,
                "has_unsubscribe": false,
                "is_muted": false
            },
            "price": {
                "cost": 20,
                "currency": "USD"
            },
            "subscribed_at": "2021-10-27T14:05:06.000000Z"
        }
    ],
    "meta": {
        "paginate": {
            "total": 1,
            "offset": 0,
            "limit": 10
        }
    }
}
```

<!-- tabs:end -->


## Посмотреть одноразовый доступ поста по пользователю и по посту

**URL**: ```/api/v1/userfeed/one-time-subscription/user/{user_id}/post/{post_id}```

**Method**: GET

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|user_id|int|required|ID пользователя|
|post_id|int|required|ID поста|

#### ** Пример запроса **
```
{
   "user_id" : 106,
   "post_id" : 363
}
```

#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|data|object|Посты в канакле|
|status|string|Состояние запроса|

#### ** Пример ответа **

```
{
    "data": {
        "post": {
            "id": 363,
            "channel_id": 106,
            "title": "admin admin",
            "slug": "admin-admin-2",
            "short_description": "test short_description",
            "description": "<p>aaaaaa</p>",
            "seo": {
                "meta_title": null,
                "meta_description": null,
                "meta_keywords": null
            },
            "created_at": "2021-10-26T09:15:30.000000Z",
            "user": {
                "id": 106,
                "login": "OliverBlack",
                "name": "Trusted",
                "media": {
                    "avatar": "http://tor2coin.loc/storage/media/207/8_avatar_1631730265.png",
                    "banner": ""
                },
                "is_verified": true
            },
            "has_update": true,
            "has_delete": true,
            "viewed": 2,
            "reactions": {
                "like": 0,
                "dislike": 0
            },
            "current_reacted": "",
            "last_modified": "user",
            "cover": "",
            "is_private": 1,
            "can_comment": true,
            "comments_count": 0,
            "private": {
                "type": "both",
                "price": {
                    "cost": 20,
                    "currency": "USD"
                }
            }
        },
        "user": {
            "id": 106,
            "login": "OliverBlack",
            "name": "Trusted",
            "media": {
                "avatar": "http://tor2coin.loc/storage/media/207/8_avatar_1631730265.png",
                "banner": ""
            },
            "is_verified": true
        },
        "price": {
            "cost": 20,
            "currency": "USD"
        },
        "subscribed_at": "2021-10-26T09:49:15.000000Z"
    },
    "meta": [],
    "status": "success"
}
```

<!-- tabs:end -->



## Подписаться на тариф канала

**URL**: ```/api/v1/userfeed/plan/{plan_id}/subscribers```

**Method**: POST

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|plan_id|int|required|ID тарифа|

#### ** Пример запроса **
```
{
   "plan_id": 91
}
```

#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|data|object|Посты в канакле|
|status|string|Состояние запроса|

#### ** Пример ответа **

```
{
    "data": [
        {
            "id": 13,
            "login": "Lol3eg",
            "name": "BXODA.NET",
            "media": {
                "avatar": "",
                "banner": ""
            },
            "is_verified": false,
            "channel": {
                "id": 13,
                "is_enabled": false,
                "subscribers": 0,
                "is_subscribed": false,
                "is_verified": false,
                "user": {
                    "id": 13,
                    "login": "Lol3eg",
                    "name": "BXODA.NET",
                    "media": {
                        "avatar": "",
                        "banner": ""
                    },
                    "is_verified": false
                },
                "has_subscribe": true,
                "has_unsubscribe": false,
                "is_muted": false,
                "private_subscription": {
                    "start_date": "2021-10-27 22:29:45",
                    "end_date": "2021-10-27 22:29:45"
                }
            }
        }
    ],
    "status": "success",
    "meta": {
        "paginate": {
            "total": 3,
            "offset": 0,
            "limit": 1
        }
    }
}
```

<!-- tabs:end -->


## Все подписчики тарифа

**URL**: ```/api/v1/userfeed/plan/{plan_id}/subscribers```

**Method**: GET

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|plan_id|int|required|ID тарифа|
|offset|int||для пагинации|
|limit|int||для пагинации|

#### ** Пример запроса **
```
{
   "plan_id": 91
}
```

#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|data|object|Посты в канакле|
|status|string|Состояние запроса|

#### ** Пример ответа **

```
{
    "data": [
        {
            "plan": {
                "id": 1,
                "type": "monthly",
                "price": {
                    "cost": 15,
                    "currency": "USD"
                },
                "channel_id": 475,
                "updated_at": "2021-10-27T13:10:21.000000Z"
            },
            "channel": {
                "id": 475,
                "is_enabled": true,
                "subscribers": 1,
                "is_subscribed": true,
                "is_verified": false,
                "user": {
                    "id": 475,
                    "login": "Rambler1",
                    "name": "MAGNUM",
                    "media": {
                        "avatar": "",
                        "banner": ""
                    },
                    "is_verified": false
                },
                "has_subscribe": false,
                "has_unsubscribe": true,
                "is_muted": false
            },
            "user": {
                "id": 106,
                "login": "OliverBlack",
                "name": "Trusted",
                "media": {
                    "avatar": "http://tor2coin.loc/storage/media/207/8_avatar_1631730265.png",
                    "banner": ""
                },
                "is_verified": true
            },
            "paid_price": {
                "cost": 15,
                "currency": "USD"
            },
            "start_date": "2021-10-27T14:42:49.000000Z",
            "end_date": "2021-11-27T14:42:49.000000Z",
            "created_at": "2021-10-27T14:42:49.000000Z"
        }
    ],
    "meta": {
        "paginate": {
            "total": 1,
            "offset": 0,
            "limit": 10
        }
    }
}
```

<!-- tabs:end -->


## Получить подписку на тарифный план от данного пользователя

**URL**: ```/api/v1/userfeed/plan/{plan_id}/subscribers/{user_id}```

**Method**: GET

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|plan_id|int|required|ID тарифа|
|user_id|int|required|ID ползвателя|

#### ** Пример запроса **
```
{
   "plan_id": 91,
   "user_id": 106
}
```

#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|data|object|Посты в канакле|
|status|string|Состояние запроса|

#### ** Пример ответа **

```
{
    "data": {
        "plan": {
            "id": 1,
            "type": "monthly",
            "price": {
                "cost": 15,
                "currency": "USD"
            },
            "channel_id": 475,
            "updated_at": "2021-10-27T13:10:21.000000Z"
        },
        "channel": {
            "id": 475,
            "is_enabled": true,
            "subscribers": 1,
            "is_subscribed": true,
            "is_verified": false,
            "user": {
                "id": 475,
                "login": "Rambler1",
                "name": "MAGNUM",
                "media": {
                    "avatar": "",
                    "banner": ""
                },
                "is_verified": false
            },
            "has_subscribe": false,
            "has_unsubscribe": true,
            "is_muted": false
        },
        "user": {
            "id": 106,
            "login": "OliverBlack",
            "name": "Trusted",
            "media": {
                "avatar": "http://tor2coin.loc/storage/media/207/8_avatar_1631730265.png",
                "banner": ""
            },
            "is_verified": true
        },
        "paid_price": {
            "cost": 15,
            "currency": "USD"
        },
        "start_date": "2021-10-27T14:42:49.000000Z",
        "end_date": "2021-11-27T14:42:49.000000Z",
        "created_at": "2021-10-27T14:42:49.000000Z"
    },
    "meta": [],
    "status": "success"
}
```

<!-- tabs:end -->


## Тип приватности постов

**URL**: ```/api/v1/userfeed/post-plans```

**Method**: GET

<!-- tabs:start -->



#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|

> Тип приватности (`one_time`, `subscription`, `both`)
#### ** Пример запроса **
```
{
}
```

#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|data|object|Посты в канакле|
|status|string|Состояние запроса|

#### ** Пример ответа **

```
{
    "data": [
        {
            "id": 10,
            "post": {
                "id": 362,
                "channel_id": 106,
                "title": "admin admin",
                "slug": "admin-admin",
                "short_description": "test short_description",
                "description": "<p>aaaaaa</p>",
                "seo": {
                    "meta_title": null,
                    "meta_description": null,
                    "meta_keywords": null
                },
                "created_at": "2021-10-26T09:15:29.000000Z",
                "user": {
                    "id": 106,
                    "login": "OliverBlack",
                    "name": "Trusted",
                    "media": {
                        "avatar": "http://tor2coin.loc/storage/media/207/8_avatar_1631730265.png",
                        "banner": ""
                    },
                    "is_verified": true
                },
                "has_update": true,
                "has_delete": true,
                "viewed": 0,
                "reactions": {
                    "like": 0,
                    "dislike": 0
                },
                "current_reacted": "",
                "last_modified": "user",
                "cover": "",
                "is_private": 1,
                "can_comment": true,
                "comments_count": 0,
                "private": {
                    "type": "both",
                    "price": {
                        "cost": 20,
                        "currency": "USD"
                    }
                }
            },
            "type": "both",
            "price": {
                "cost": 20,
                "currency": "USD"
            },
            "created_at": "2021-10-26T09:15:29.000000Z"
        },
        {
            "id": 11,
            "post": {
                "id": 363,
                "channel_id": 106,
                "title": "admin admin",
                "slug": "admin-admin-2",
                "short_description": "test short_description",
                "description": "<p>aaaaaa</p>",
                "seo": {
                    "meta_title": null,
                    "meta_description": null,
                    "meta_keywords": null
                },
                "created_at": "2021-10-26T09:15:30.000000Z",
                "user": {
                    "id": 106,
                    "login": "OliverBlack",
                    "name": "Trusted",
                    "media": {
                        "avatar": "http://tor2coin.loc/storage/media/207/8_avatar_1631730265.png",
                        "banner": ""
                    },
                    "is_verified": true
                },
                "has_update": true,
                "has_delete": true,
                "viewed": 2,
                "reactions": {
                    "like": 0,
                    "dislike": 0
                },
                "current_reacted": "",
                "last_modified": "user",
                "cover": "",
                "is_private": 1,
                "can_comment": true,
                "comments_count": 0,
                "private": {
                    "type": "both",
                    "price": {
                        "cost": 20,
                        "currency": "USD"
                    }
                }
            },
            "type": "both",
            "price": {
                "cost": 20,
                "currency": "USD"
            },
            "created_at": "2021-10-26T09:15:30.000000Z"
        }
    ],
    "meta": {
        "paginate": {
            "total": 2,
            "offset": 0,
            "limit": 10
        }
    }
}
```

<!-- tabs:end -->



## Настроить ленту, сохранить теги

**URL**: ```/api/v1/userfeed/tag/settings```

**Method**: POST

<!-- tabs:start -->


#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|tags|array|required|IDs тегов|


#### ** Пример запроса **
```
{
   tags[0]: 1,
   tags[1]: 2,
   tags[3]: 3
}
```

#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|data|object|Посты в канакле|
|status|string|Состояние запроса|

#### ** Пример ответа **

```
{
    "data": [
        {
            "id": 1,
            "namespace": "новости",
            "slug": "news",
            "name": "новости",
            "count": 0,
            "is_popular": 0
        },
        {
            "id": 2,
            "namespace": "блокчейн-и-финтех",
            "slug": "blockchain-and-fintech",
            "name": "блокчейн и финтех",
            "count": 0,
            "is_popular": 0
        },
        {
            "id": 5,
            "namespace": "юриспруденция-и-блокчейн",
            "slug": "jurisprudence-and-blockchain",
            "name": "юриспруденция и блокчейн",
            "count": 0,
            "is_popular": 0
        },
        {
            "id": 4,
            "namespace": "электронные-деньги",
            "slug": "electronic-money",
            "name": "электронные деньги",
            "count": 0,
            "is_popular": 0
        }
    ],
    "status": "success"
}
```

<!-- tabs:end -->


## Настроить ленту, получить теги

**URL**: ```/api/v1/userfeed/tag/settings```

**Method**: GET

<!-- tabs:start -->


#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|


#### ** Пример запроса **
```
{

}
```

#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|data|object|Посты в канакле|
|status|string|Состояние запроса|

#### ** Пример ответа **

```
{
    "data": [
        {
            "id": 1,
            "namespace": "новости",
            "slug": "news",
            "name": "новости",
            "count": 0,
            "is_popular": 0
        },
        {
            "id": 2,
            "namespace": "блокчейн-и-финтех",
            "slug": "blockchain-and-fintech",
            "name": "блокчейн и финтех",
            "count": 0,
            "is_popular": 0
        },
        {
            "id": 5,
            "namespace": "юриспруденция-и-блокчейн",
            "slug": "jurisprudence-and-blockchain",
            "name": "юриспруденция и блокчейн",
            "count": 0,
            "is_popular": 0
        },
        {
            "id": 4,
            "namespace": "электронные-деньги",
            "slug": "electronic-money",
            "name": "электронные деньги",
            "count": 0,
            "is_popular": 0
        }
    ],
    "status": "success"
}
```

<!-- tabs:end -->


## Получить комиссию сервиса приватных постов

**URL**: ```/api/v1/userfeed/post-commission```

**Method**: GET

<!-- tabs:start -->


#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|

#### ** Пример запроса **
```
{

}
```

#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|data|object|Комиссия|
|status|string|Состояние запроса|

#### ** Пример ответа **

```
{
    "data": {
        "key": "private_posts_service_commission",
        "value": "18"
    },
    "meta": [],
    "status": "success"
}
```

<!-- tabs:end -->

## Выдача пользователю прав на комментирование

**URL**: ```api/v1/userfeed/user/{user_id}/enable-comments```

**Method**: POST

**URL**: ```api/v1/userfeed/user/{user_id}/disable-comments```

**Method**: DELETE

<!-- tabs:start -->

#### ** Список полей запроса **

|Название|Тип|Validation|Описание|
|--|--|--|--|
|user_id|int|required|ID пользователя|

#### ** Пример запроса **

```
{
    "user_id": 106,
}
```
#### ** Список полей ответа **

|Название|Тип|Описание|
|--|--|--|
|status|string|Состояние запроса|

#### ** Пример ответа **

```
{
    "status": "success",
}
```
или

```
{
   "status" : "failure"
}
```

<!-- tabs:end -->

## Поставить комментарию лайк/дизлайк

**URL**: ```/api/v1/userfeed/comment/like```

**URL**: ```/api/v1/userfeed/comment/dislike```

**Method**: POST

<!-- tabs:start -->

#### ** Список полей запроса **

| Название   |Тип|Validation|Описание|
|------------|--|--|--|
| comment_id |int|required|ID комментария

#### ** Пример запроса **
```
{
    "comment_id": 7,
}
```

#### ** Список полей ответа **

|Название|Тип| Описание                                    |
|--|--|---------------------------------------------|
|count|int| Количество лайков и дизлайков к комментарию |
|status|string| состояние запроса                           |

#### ** Пример ответа **

```
{
    "data": {
        "count": {
            "like": 1,
            "dislike": 1
        }
    }
}
```
<!-- tabs:end -->


## Добавить комментарий

**URL**: ```/api/v1/userfeed/comment```

**Method**: POST

<!-- tabs:start -->

#### ** Список полей запроса **

| Название         | Тип    |Validation|Описание|
|------------------|--------|--|--|
| post_id          | int    |required|ID комментария
| comment          | string |required|текст комментария
| reply_to_comment | int    ||ID комментария, на который отвечаем (необязательный)

#### ** Пример запроса **
```
{
  "post_id": 1,
  "comment": "Lorem ipsum dolor sit amet",
  "reply_to_comment": 25
}
```

#### ** Список полей ответа **

| Название   | Тип           | Описание                         |
|------------|---------------|----------------------------------|
| id         | int           | Идентификатор комментария        |
| comment    | string        | Текст комментария                |
| reply_to   | object / null | Родительский комментарий         |
| replies    | int           | Кол-во ответов на комментарий    |
| thread     | string / null | Идентификатор ветки комментариев |
| post       | object        | Пост                             |
| user       | object        | Автор комментария                |
| reactions  | object        | Лайки/дизлайки                   |
| created_at | string        | Дата создания                    |
| deleted_at | string / null | Дата удаления                    |

#### ** Пример ответа **

```
{
  "data": {
    "id": 37,
    "comment": "Lorem ipsum dolor sit amet",
    "reply_to": {
      "id": 25,
      "comment": "Sed ut perspiciatis unde omnis",
      "replies": 8,
      "thread": "5mhj3xp90C6B",
      "user": {
        "id": 4,
        "name": "buyer",
        "media": {
          "avatar": "",
          "banner": ""
        },
       "is_verified": true
      },
      "reactions": {
        "like": 0,
        "dislike": 0
      },
      "created_at": "2024-02-22 07:47:52",
      "deleted_at": null
    },
    "replies": 0,
    "thread": "5mhj3xp90C6B",
    "post": {
      "id": 1,
      "title": "post 1",
      "slug": "post-1",
      "short_description": "post 1",
      "user": {
        "id": 1,
        "name": "admin",
        "media": {
          "avatar": "",
          "banner": ""
        },
        "is_verified": true
      },
      "cover": ""
    },
    "user": {
      "id": 4,
      "name": "buyer",
        "media": {
        "avatar": "",
        "banner": ""
      },
      "is_verified": true
    },
    "reactions":{
      "like": 0,
      "dislike": 0
    },
    "created_at": "2024-02-22 09:59:46",
    "deleted_at": null
  },
  "meta":[],
  "status": "success"
}
```
<!-- tabs:end -->


## Редактириование комментария

**URL**: ```/api/v1/userfeed/comment/{commentId}```

**Method**: POST

<!-- tabs:start -->

#### ** Список полей запроса **

| Название   | Тип    |Validation|Описание|
|------------|--------|--|--|
| comment | string |required|текст комментария

#### ** Пример запроса **
```
{
    "comment": "Lorem ipsum dolor sit amet",
}
```

#### ** Список полей ответа **

|Название|Тип| Описание                                    |
|--|--|---------------------------------------------|
|status|string| состояние запроса                           |

#### ** Пример ответа **

```
{
    "status": "success",
}
```
<!-- tabs:end -->


## Получить комментарий и ближайших соседей

**URL**: ```/api/v1/userfeed/comment/{commentId}```

**Method**: GET

<!-- tabs:start -->

> Возвращает комментарий, всех предков ветке и 5 потомков

#### ** Список полей запроса **

| Название  | Тип | Validation | Описание       |
|-----------|-----|------------|----------------|
| commentId | int | required   | ID комментария |

#### ** Пример запроса **
```
{

}
```

#### ** Список полей ответа **

| Название | Тип   | Описание            |
|----------|-------|---------------------|
| data     | array | Список комментариев |

#### ** Пример ответа **

```
{
  "data": [{
    "id": 1,
    "comment": "Комментарий удален",
    "reply_to": null,
    "replies": 0,
    "thread": null,
    "post": {
      "id": 1,
      "title": "post 1",
      "slug": "post-1",
      "short_description": "post 1",
      "user": {
        "id": 1,
        "name": "admin",
        "media": {
          "avatar": "",
          "banner": ""
        },
        "is_verified": true
      },
      "cover": ""
    },
    "user": {
      "id": 4,
      "name": "buyer",
      "media": {
        "avatar": "",
        "banner": ""
      },
      "is_verified": true
    },
    "reactions": {
      "like": 1,
      "dislike": 0
    },
    "created_at": "2024-02-21 20:29:07",
    "deleted_at": "2024-02-21 20:30:47"
    },
  ],
}
```
<!-- tabs:end -->

## Удаление комментария

**URL**: ```/api/v1/userfeed/comment/{commentId}```

**Method**: DELETE

<!-- tabs:start -->

> Комментарий не удаляется физически. При удалении устанавливается deleted_at,
> текст комментария меняется на "Комментарий удален"
> 
#### ** Список полей запроса **

| Название   | Тип | Validation | Описание       |
|------------|-----|------------|----------------|
|commentId   | int | required   | ID Комментария |


#### ** Пример запроса **
```
{

}
```

#### ** Список полей ответа **

|Название|Тип| Описание                                    |
|--|--|---------------------------------------------|
|status|string| состояние запроса                           |

#### ** Пример ответа **

```
{
    "status": "success",
}
```
<!-- tabs:end -->


## Список комментариев пользователя

**URL**: ```/api/v1/userfeed/comment/user/{userId}```

**Method**: GET

<!-- tabs:start -->

#### ** Список полей запроса **

| Название | Тип | Validation | Описание        |
|----------|-----|------------|-----------------|
| userId   | int | required   | ID пользователя |
| offset   | int |            | для пагинации   |
| limit    | int |            | для пагинации   |

#### ** Пример запроса **
```
{

}
```

#### ** Список полей ответа **

|Название|Тип| Описание                                    |
|--|--|---------------------------------------------|
|status|string| состояние запроса                           |

#### ** Пример ответа **

```
{
  "data": [{
    "id": 1,
    "comment": "Комментарий удален",
    "reply_to": null,
    "replies": 0,
    "thread": null,
    "post": {
      "id": 1,
      "title": "post 1",
      "slug": "post-1",
      "short_description": "post 1",
      "user": {
        "id": 1,
        "name": "admin",
        "media": {
          "avatar": "",
          "banner": ""
        },
        "is_verified": true
      },
      "cover": ""
    },
    "user": {
      "id": 4,
      "name": "buyer",
      "media": {
        "avatar": "",
        "banner": ""
      },
      "is_verified": true
    },
    "reactions": {
      "like": 1,
      "dislike": 0
    },
    "created_at": "2024-02-21 20:29:07",
    "deleted_at": "2024-02-21 20:30:47"
  }],
  "status": "success",
  "meta": {
    "paginate": {
      "total": 36,
      "offset": 0,
      "limit": 10
    }
  }
}
```
<!-- tabs:end -->


## Список комментариев поста

**URL**: ```/api/v1/userfeed/comment/post/{postId}```

**Method**: GET

<!-- tabs:start -->

> 
#### ** Список полей запроса **

| Название | Тип | Validation | Описание      |
|----------|-----|------------|---------------|
| postId   | int | required   | ID поста      |
| offset   | int |            | для пагинации |
| limit    | int |            | для пагинации |

#### ** Пример запроса **
```
{

}
```

#### ** Список полей ответа **

|Название|Тип| Описание                                    |
|--|--|---------------------------------------------|
|status|string| состояние запроса                           |

#### ** Пример ответа **

```
{
  "data": [{
    "id": 1,
    "comment": "Комментарий удален",
    "reply_to": null,
    "replies": 0,
    "thread": null,
    "post": {
      "id": 1,
      "title": "post 1",
      "slug": "post-1",
      "short_description": "post 1",
      "user": {
        "id": 1,
        "name": "admin",
        "media": {
          "avatar": "",
          "banner": ""
        },
        "is_verified": true
      },
      "cover": ""
    },
    "user": {
      "id": 4,
      "name": "buyer",
      "media": {
        "avatar": "",
        "banner": ""
      },
      "is_verified": true
    },
    "reactions": {
      "like": 1,
      "dislike": 0
    },
    "created_at": "2024-02-21 20:29:07",
    "deleted_at": "2024-02-21 20:30:47"
  }],
  "status": "success",
  "meta": {
    "paginate": {
      "total": 36,
      "offset": 0,
      "limit": 10
    }
  }
}
```
<!-- tabs:end -->



## Список комментариев треда

**URL**: ```/api/v1/userfeed/comment/thread```

**Method**: GET

<!-- tabs:start -->

>
#### ** Список полей запроса **

| Название  | Тип    | Validation | Описание                                      |
|-----------|--------|------------|-----------------------------------------------|
| thread_id | string | required   | ID треда                                      |
| parent    | bool   |            | Включить в результат родительский комментарий |
| offset    | int    |            | для пагинации                                 |
| limit     | int    |            | для пагинации                                 |

#### ** Пример запроса **
```
{

}
```

#### ** Список полей ответа **

| Название | Тип   | Описание            |
|----------|-------|---------------------|
| data     | array | Список комментариев |

#### ** Пример ответа **

```
{
  "data": [{
    "id": 1,
    "comment": "Комментарий удален",
    "reply_to": null,
    "replies": 0,
    "thread": null,
    "post": {
      "id": 1,
      "title": "post 1",
      "slug": "post-1",
      "short_description": "post 1",
      "user": {
        "id": 1,
        "name": "admin",
        "media": {
          "avatar": "",
          "banner": ""
        },
        "is_verified": true
      },
      "cover": ""
    },
    "user": {
      "id": 4,
      "name": "buyer",
      "media": {
        "avatar": "",
        "banner": ""
      },
      "is_verified": true
    },
    "reactions": {
      "like": 1,
      "dislike": 0
    },
    "created_at": "2024-02-21 20:29:07",
    "deleted_at": "2024-02-21 20:30:47"
  }],
  "status": "success",
  "meta": {
    "paginate": {
      "total": 36,
      "offset": 0,
      "limit": 10
    }
  }
}
```
<!-- tabs:end -->
