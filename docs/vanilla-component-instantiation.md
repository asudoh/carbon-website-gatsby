# Vanilla component instantiation

Vanilla components in Carbon website are instantiated in `componentDidUpdate()` lifecycle phase of `<ComponentExample>` component, which means when the DOM for the latest state is available.

The code attempts to instantiate all Carbon components inside `<ComponentExample>`, by:

1. Going through the list of Carbon components from [`carbon-components/globals/js/components`](https://github.com/IBM/carbon-components/blob/v9.43.0/src/globals/js/components.js) module
2. Find DOM nodes of Carbon components inside `<ComponentExample>` (DOM nodes matching CSS selector defined in `ComponentClass.selectorInit`) and call the factory method `.create()`

Some components (notably modal) take an alternate approach  for 2., which is, lazy intantiation (delaying intantiation until modal's launcher button is clicked)

We keep track of component instances so we can clean them up when `<ComponentExample>` is re-rendered with a different component (e.g. from accordion to check box), etc.

## Handling floating menu

Given `<ComponentExample>` scopes CSS in its DOM element, letting floating menus places outside `<ComponentExample>` causes wrong style applied to them.

To avoid that, `<ComponentExample>` let those floating menus placed right in the DOM node of `<ComponentExample>`. Doing so requires adjustment of left/top positions of the floating menus. It's done in the following ways:

* Date picker: Hooks [an event of positioning floating menu](https://github.com/flatpickr/flatpickr/blob/v4.5.2/src/types/options.ts#L45) and change left/top positions in DOM level
* Overflow menu and tooltip: Hooks [an API of adjusting floating menu position](https://github.com/IBM/carbon-components/tree/v9.43.0/src/components/overflow-menu#example---changing-menu-position-by-8-pixels-vertically) and calculate the difference between left/top positions of the viewport and left/top positions of the DOM node of `<ComponentExample>`
