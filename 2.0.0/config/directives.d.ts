import { Type } from 'angular2/core';
import { OverlayNav } from '../components/overlay/overlay';
import { Menu } from '../components/menu/menu';
import { MenuToggle } from '../components/menu/menu-toggle';
import { MenuClose } from '../components/menu/menu-close';
import { Button } from '../components/button/button';
import { Blur } from '../components/blur/blur';
import { Content } from '../components/content/content';
import { Scroll } from '../components/scroll/scroll';
import { Refresher } from '../components/scroll/pull-to-refresh';
import { Slides, Slide } from '../components/slides/slides';
import { Tabs } from '../components/tabs/tabs';
import { Tab } from '../components/tabs/tab';
import { List } from '../components/list/list';
import { ItemSliding } from '../components/item/item-sliding';
import { Toolbar, ToolbarTitle, ToolbarItem } from '../components/toolbar/toolbar';
import { Icon } from '../components/icon/icon';
import { Checkbox } from '../components/checkbox/checkbox';
import { Toggle } from '../components/toggle/toggle';
import { TextInput, TextInputElement } from '../components/text-input/text-input';
import { Label } from '../components/text-input/label';
import { Segment, SegmentButton } from '../components/segment/segment';
import { RadioGroup, RadioButton } from '../components/radio/radio';
import { Searchbar, SearchbarInput } from '../components/searchbar/searchbar';
import { Nav } from '../components/nav/nav';
import { NavPush } from '../components/nav/nav-push';
import { NavRouter } from '../components/nav/nav-router';
import { NavbarTemplate, Navbar } from '../components/navbar/navbar';
import { IdRef } from '../components/app/id';
import { HideWhen } from '../components/show-hide-when/show-hide-when';
/**
 * @name IONIC_DIRECTIVES
 * @private
 * @description
 * The core Ionic directives as well as Angular's CORE_DIRECTIVES and
 * FORM_DIRECTIVES.  Automatically available in every [@Page](../Page/) template.
 *
 * **Angular**
 * - CORE_DIRECTIVES
 * - FORM_DIRECTIVES
 *
 * **Content**
 * -  OverlayNav
 * -  Menu
 * -  MenuToggle
 * -  MenuClose
 *
 * -  Button
 * -  Blur
 * -  Content
 * -  Scroll
 * -  Refresher
 *
 * **Lists**
 * -  List
 * -  ListHeader
 * -  Item
 * -  ItemSliding
 *
 * **Slides**
 * -  Slides
 * -  Slide
 * -  SlideLazy
 *
 * **Tabs**
 * -  Tabs
 * -  Tab
 *
 * **Toolbar**
 * -  Toolbar
 * -  ToolbarTitle
 * -  ToolbarItem
 *
 * **Media**
 * -  Icon
 *
 * **Forms**
 * -  Searchbar
 * -  Segment
 * -  SegmentButton
 * -  Checkbox
 * -  RadioGroup
 * -  RadioButton
 * -  Toggle
 * -  TextInput
 * -  TextInputElement
 * -  Label
 *
 * **Nav**
 * -  Nav
 * -  NavbarTemplate
 * -  Navbar
 * -  NavPush
 * -  NavPop
 * -  NavRouter
 * -  IdRef
 *
 * -  ShowWhen
 * -  HideWhen
 */
export declare const IONIC_DIRECTIVES: (Type[] | typeof OverlayNav | typeof Menu | typeof MenuToggle | typeof MenuClose | typeof Button | typeof Blur | typeof Content | typeof Scroll | typeof Refresher | typeof List | typeof ItemSliding | typeof Slides | typeof Slide | typeof Tabs | typeof Tab | typeof Toolbar | typeof ToolbarTitle | typeof ToolbarItem | typeof Icon | typeof Searchbar | typeof SearchbarInput | typeof Segment | typeof SegmentButton | typeof Checkbox | typeof RadioGroup | typeof RadioButton | typeof Toggle | typeof TextInput | typeof TextInputElement | typeof Label | typeof Nav | typeof NavbarTemplate | typeof Navbar | typeof NavPush | typeof NavRouter | typeof IdRef | typeof HideWhen)[];
