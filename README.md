# API методы для блога {docsify-ignore-all}

## Доступ к создание канала

**URL**: `/api/v1/userfeed/channel/{user_id}`

**Method**: PUT

<!-- tabs:start -->

#### ** Список полей запроса **

| Название    | Тип     | Validation | Описание                      |
| ----------- | ------- | ---------- | ----------------------------- |
| user_id     | int     | required   | ID пользователя               |
| is_activate | boolean | required   | Дать доступ (`true`, `false`) |

> user_id является первичным ключом в таблице каналов (feed_channels)

#### ** Пример запроса **

```
{
    "user_id": 106,
    "is_activate": true
}
```

#### ** Список полей ответа **

| Название | Тип    | Описание          |
| -------- | ------ | ----------------- |
| status   | string | Состояние запроса |

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

**URL**: `api/v1/userfeed/user/{user_id}/verify`

**Method**: POST

**URL**: `api/v1/userfeed/user/{user_id}/unverify`

**Method**: DELETE

<!-- tabs:start -->

#### ** Список полей запроса **

| Название | Тип | Validation | Описание        |
| -------- | --- | ---------- | --------------- |
| user_id  | int | required   | ID пользователя |

> user_id являеться первичным ключом в таблице каналов (feed_channels)

#### ** Пример запроса **

```
{
    "user_id": 106,
}
```

#### ** Список полей ответа **

| Название | Тип    | Описание          |
| -------- | ------ | ----------------- |
| status   | string | Состояние запроса |

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

**URL**: `/api/v1/userfeed/channel/{channel_id}/subscribe`

**Method**: POST

<!-- tabs:start -->

#### ** Список полей запроса **

| Название   | Тип | Validation | Описание                 |
| ---------- | --- | ---------- | ------------------------ |
| channel_id | int | required   | ID канала (пользователя) |

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

| Название         | Тип    | Описание                   |
| ---------------- | ------ | -------------------------- |
| data             | object | Подписчики и их количество |
| data.count       | int    | Количество                 |
| data.subscribers | array  | Подписчики                 |
| status           | object | Состояние запроса          |

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

**URL**: `/api/v1/userfeed/channel/{channel_id}/subscribe`

**Method**: DELETE

<!-- tabs:start -->

#### ** Список полей запроса **

| Название   | Тип | Validation | Описание                 |
| ---------- | --- | ---------- | ------------------------ |
| channel_id | int | required   | ID канала (пользователя) |

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

| Название         | Тип    | Описание                   |
| ---------------- | ------ | -------------------------- |
| data             | object | Подписчики и их количество |
| data.count       | int    | Количество                 |
| data.subscribers | array  | Подписчики                 |
| status           | object | Состояние запроса          |

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

**URL**: `/api/v1/userfeed/channel/{channel_id}`

**Method**: GET

<!-- tabs:start -->

#### ** Список полей запроса **

| Название   | Тип | Validation | Описание                 |
| ---------- | --- | ---------- | ------------------------ |
| channel_id | int | required   | ID канала (пользователя) |

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

| Название         | Тип     | Описание                              |
| ---------------- | ------- | ------------------------------------- |
| data             | object  | Подписчики и их количество            |
| data.is_enabled  | boolean | Активный канал или нет                |
| data.subscribers | int     | Подписчики                            |
| data.subscribed  | boolean | Текущий пользователь подписан или нет |
| data.is_verified | boolean | Автор верифицирован или нет           |
| status           | object  | Состояние запроса                     |

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

**URL**: `/api/v1/userfeed/channel/{channel_id}/post`

**Method**: GET

<!-- tabs:start -->

#### ** Список полей запроса **

| Название   | Тип | Validation | Описание                 |
| ---------- | --- | ---------- | ------------------------ |
| channel_id | int | required   | ID канала (пользователя) |
| offset     | int | required   | Загрузить частично       |

#### ** Пример запроса **

```
{
    "channel_id": 106,
    "offset": 10
}
```

#### ** Список полей ответа **

| Название | Тип    | Описание          |
| -------- | ------ | ----------------- |
| data     | object | Посты в канакле   |
| status   | string | Состояние запроса |

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

**URL**: `api/v1/userfeed/feed`

**Method**: GET

<!-- tabs:start -->

#### ** Список полей запроса **

| Название       | Тип    | Validation | Описание                                                                          |
| -------------- | ------ | ---------- | --------------------------------------------------------------------------------- |
| offset         | int    |            | Загрузить частично                                                                |
| limit          | int    |            | Загрузить частично                                                                |
| search         | string |            | Поиск по статьям (поиск осуществляется по названию, описанияю, краткому описанию) |
| filter[type]   | string | required   | Поиск по типу (`personal`, `popular`, `fresh`)                                    |
| filter[tag_id] | string |            | Поиск по тегу                                                                     |

> personal = моя лента,
> popular = популярное,
> fresh = свежее,

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

| Название | Тип    | Описание          |
| -------- | ------ | ----------------- |
| data     | object | Посты в ленте     |
| status   | string | Состояние запроса |

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
                "meta_keywords": "meta keywords","
```
