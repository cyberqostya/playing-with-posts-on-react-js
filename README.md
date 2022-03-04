Github Pages: https://cyberqostya.github.io/playing-with-posts-on-react-js


## Описание не интуитивно понятной работы:
Начальная страница незалогинившегося пользователя `/login`.
Происходит редирект с любого другого URL.
Чтобы залогиниться нужно просто нажать кнопку `Login` (упрощенно).

***

Чтобы был виден прелоадер, сделана искусственная задержка с помощью промисифицированного `setTimeout`.
Как только красный блок (наглядно) внизу постов попадает в область видимости пользователя ([Intersection Observer API](https://developer.mozilla.org/ru/docs/Web/API/Intersection_Observer_API)), сразу идет запрос к внешнему API за новой порцией постов и их отрисовка.

***





### Использовались:
1. CRA
1. SPA
1. axios
1. [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
1. Block.module.css
1. Созранение состояния залогинивания в localStorage
1. [Intersection Observer API](https://developer.mozilla.org/ru/docs/Web/API/Intersection_Observer_API)
1. UI-компоненты
1. [react-router-dom v6](https://reactrouter.com/docs/en/v6/getting-started/overview)
1. [React transition group](https://reactcommunity.org/react-transition-group/)
1. Декомпозиция кода с лаконичной файловой структурой

### Реализованы:
1. Добавление поста
1. Удаление поста
1. Сортировка по названию и содержимому
1. Прелоадер
1. Обращение к API с постами [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
1. Роутинг по страницам
    1. Приватные и публичные маршруты
1. Постраничная навигация
1. Бесконечная лента
1. Упор на логику, не на верстку


### Использование хуков:
1. useState
1. useRef
1. useMemo (кеширует результат выполнения и при изменении зависимости - пересчитывает)
1. useEffect
1. useContext
1. Кастомные хуки (например useFetching) для переиспользования функционала
1. useNavigate, useParams
