# Чатик

![](https://img.shields.io/github/languages/top/TolkachevPeter/middle.messenger.praktikum.yandex)
![](https://img.shields.io/github/languages/count/TolkachevPeter/middle.messenger.praktikum.yandex)
[![Netlify Status](https://api.netlify.com/api/v1/badges/7f9f2f99-dee1-441c-bc02-a3eef9478d28/deploy-status)](https://app.netlify.com/sites/frabjous-paletas-38af62/deploys)



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

- [Netlify Preview](https://deploy-preview-3--frabjous-paletas-38af62.netlify.app/)

- запущено на render.com с помощью docker и собрано с помощью Webpack, nginx занимается раздачей проекта:

- [Render.com Deployment](https://middle-messenger-praktikum-yandex-98xm.onrender.com/)


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

## Как сделать вклад

Мы приветствуем любые вклады. Если вы хотите внести свой вклад, вот как вы можете помочь:

- Репортить баги и предлагать улучшения в нашем [issue tracker](https://github.com/TolkachevPeter/middle.messenger.praktikum.yandex/issues)
- Предлагать новые идеи и обсуждать текущие в нашем [section for ideas](https://github.com/TolkachevPeter/middle.messenger.praktikum.yandex/discussions/categories/ideas)
- Вносить изменения через [pull requests](https://github.com/TolkachevPeter/middle.messenger.praktikum.yandex/pulls)


## Контакты

Если у вас есть вопросы, не стесняйтесь обращаться к [TolkachevPeter](mailto:peter.tolkachev@gmail.com).









# Chat / English version

Chat is an online web chat, built on simple Typescript without any frameworks. It is a project in the "middle frontend developer" course at Yandex Practicum.

The project architecture is divided according to MVC. The model part is responsible for interacting with the server API and is located in the services directory. Views and controllers are stored together for each component in the components and pages directories. The core Block.ts implements EventBus and dynamically rerenders after updating block properties. Block is the central functional part and is inherited by all components/pages. All forms have validation using regular expressions. Events are triggered when the input field is blurred/focused. A separate class for HTTP requests based on XMLHttpRequest is provided, instead of axios or fetch. Page routing uses the History API. CSS uses the BEM methodology. Cookies are used to store the user session.

What is yet to be done?
- Improve visually the dialog box for chat names, adding and deleting people;
- Finish form cleaning upon submit;
- Finish avatar upload at the top of the chat;
- Implement scrolling down when there are many messages in the chat;
- Solve the problem with Cookie, sometimes authorization does not work after registration;
- Display more detailed errors coming from the server;
- Possibly improve email field validation - too strict check now;
- etc.

## Demo

- [Netlify Preview](https://deploy-preview-3--frabjous-paletas-38af62.netlify.app/)

- Deployed on render.com using docker and built using Webpack, with nginx handling the project distribution:

- [Render.com Deployment](https://middle-messenger-praktikum-yandex-98xm.onrender.com/)


## Layout

```
https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0%3A1
```

## Used technologies and libraries
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

## Development utilities:
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


## Installation

Before starting, make sure to have installed node.js and npm

Clone the project onto your computer:

```
git clone https://github.com/TolkachevPeter/middle.messenger.praktikum.yandex.git
```

Install dependencies:

```
npm install
```

## Build for development

```
npm run dev
```

## Build for production

```
npm run build
```

## Local server

```
npm run start
```


## Included project scripts:

```
"start": "npm run build && node server.js" - Build the project and start a node.js server
"buildParcel": "parcel build src/index.html" - Build the project using Parcel
"devParcel": "parcel src/index.html" - Start Parcel in development mode
"lint": "eslint --fix --ext .ts ./"

 - Run eslint with automatic error correction
"test": "mocha --require ts-node/register src/**/*.{spec,test}.ts" - Run tests using Mocha
"dev": "cross-env NODE_ENV=development webpack serve -c build/webpack.config.ts" - Start Webpack in development mode
"build": "cross-env NODE_ENV=production webpack build -c build/webpack.config.ts" - Build the project using Webpack
"clean": "rimraf dist" - Clean the build directory
"prepare": "husky install" - Install git hooks using Husky
```


![](https://frabjous-paletas-38af62.netlify.app)

## How to contribute

We welcome any contributions. If you want to contribute, here's how you can help:

- Report bugs and suggest improvements in our [issue tracker](https://github.com/TolkachevPeter/middle.messenger.praktikum.yandex/issues)
- Suggest new ideas and discuss current ones in our [section for ideas](https://github.com/TolkachevPeter/middle.messenger.praktikum.yandex/discussions/categories/ideas)
- Make changes via [pull requests](https://github.com/TolkachevPeter/middle.messenger.praktikum.yandex/pulls)


## Contacts

If you have any questions, feel free to reach out to [TolkachevPeter](mailto:peter.tolkachev@gmail.com).
