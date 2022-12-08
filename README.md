https://github.com/TolkachevPeter/middle.messenger.praktikum.yandex/pull/3

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


## Макет

```
https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0%3A1
```

## В работе использовались:

- HTML
- Less
- JS
- TS
- Parcel


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


![](https://frabjous-paletas-38af62.netlify.app)
