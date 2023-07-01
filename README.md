https://github.com/TolkachevPeter/middle.messenger.praktikum.yandex/pull/4

# Чатик

![](https://img.shields.io/github/languages/top/TolkachevPeter/middle.messenger.praktikum.yandex)
![](https://img.shields.io/github/languages/count/TolkachevPeter/middle.messenger.praktikum.yandex)
[![Netlify Status](https://api.netlify.com/api/v1/badges/7f9f2f99-dee1-441c-bc02-a3eef9478d28/deploy-status)](https://app.netlify.com/sites/frabjous-paletas-38af62/deploys)



Находится в процессе разработки, в конце 4 спринта будет финальная версия.

Онлайн-веб-чат, построенный на простом Typescript без каких-либо фреймворков, проект в рамках курса «мидл фронтенд разработчик» в Яндекс практикум.

Архитектура проекта разделена согласно MVC. Модельная часть отвечает за взаимодействие с серверным API и находится в каталоге сервисов. Представления и контроллеры хранятся вместе для каждого компонента в каталогах компонентов и страниц. Ядро Block.ts реализует EventBus и динамически перерисовывается после обновления свойств блока. Блок является центральной функциональной частью и наследуется всеми компонентами/страницами. Все формы имеют проверку с помощью регулярных выражений. События запускаются при размытии/фокусе поля ввода. Представлен отдельный класс для HTTP-запросов на основе XMLHttpRequest, вместо axios или fetch. Маршрутизация по страницам использует History API. Для CSS используется методология БЭМ. Cookie используются для хранения сеанса пользователя. 

Что еще предстоит сделать?
- Улучшить визуально диалоговое окно для названия чатов, добавления и удаления персон;
- Доделать очистку формы при submit;
- Доделать загрузку аватарки вверху чата;
- Сделать прокрутку вниз при множестве сообщений в чате;
- Решить проблему с Cookie, иногда не срабатывает авторизация после регистрации.
- Выводить более подробные ошибки, приходящие с сервера;
- Возможно улучшить валидацию поля email – слишком строгая проверка сейчас;
- ect.


## Demo

```
https://deploy-preview-3--frabjous-paletas-38af62.netlify.app/
```

- запущено на render.com с помощью docker и собрано с помощью Webpack, nginx занимается раздачей проекта:
```
https://middle-messenger-praktikum-yandex-98xm.onrender.com/
```


## Макет

```
https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0%3A1
```

## Использованные технологии и библиотеки
```
HTML
Less
JS
TS
Parcel
Webpack
Express.js
Handlebars
UUID
```

## Утилиты для разработки:
```
Eslint
Mocha
Sinon
Chai
Typescript
Husky
less-loader
ts-loader
mini-css-extract-plugin
webpack
```


## Установка

Перед началом работы необходимо проверить наличие установленного node.js и npm

Скопируйте проект на компьютер:

```
git clone https://github.com/TolkachevPeter/middle.messenger.praktikum.yandex.git
```

Установите зависимости:

```
npm install
```

## Сборка для разработки

```
npm run dev
```

## Сборка для продакшена

```
npm run build
```

## Локальный сервер

```
npm run start
```


## Скрипты, включенные в проект:

```
"start": "npm run build && node server.js" - Собрать проект и запустить сервер node.js
"buildParcel": "parcel build src/index.html" - Сборка проекта с использованием Parcel
"devParcel": "parcel src/index.html" - Запуск Parcel в режиме разработки
"lint": "eslint --fix --ext .ts ./" - Запустить eslint с автоматическим исправлением ошибок
"test": "mocha --require ts-node/register src/**/*.{spec,test}.ts" - Запустить тесты с использованием Mocha
"dev": "cross-env NODE_ENV=development webpack serve -c build/webpack.config.ts" - Запуск Webpack в режиме разработки
"build": "cross-env NODE_ENV=production webpack build -c build/webpack.config.ts" - Сборка проекта с использованием Webpack
"clean": "rimraf dist" - Очистка каталога сборки
"prepare": "husky install" - Установка git hooks с использованием Husky
```


![](https://frabjous-paletas-38af62.netlify.app)
