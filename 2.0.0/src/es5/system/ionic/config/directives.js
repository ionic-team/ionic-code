System.register('ionic/config/directives', ['angular2/angular2', '../components/overlay/overlay', '../components/menu/menu', '../components/menu/menu-toggle', '../components/menu/menu-close', '../components/button/button', '../components/blur/blur', '../components/content/content', '../components/scroll/scroll', '../components/scroll/pull-to-refresh', '../components/slides/slides', '../components/tabs/tabs', '../components/tabs/tab', '../components/list/list', '../components/item/item', '../components/item/item-sliding', '../components/toolbar/toolbar', '../components/icon/icon', '../components/checkbox/checkbox', '../components/switch/switch', '../components/text-input/text-input', '../components/text-input/label', '../components/segment/segment', '../components/radio/radio', '../components/searchbar/searchbar', '../components/nav/nav', '../components/nav/nav-push', '../components/nav/nav-router', '../components/navbar/navbar', '../components/app/id', '../components/show-hide-when/show-hide-when'], function (_export) {
    /**
     * The core Ionic directives as well as Angular's CORE_DIRECTIVES and
     * FORM_DIRECTIVES.  Automatically available in every [@Page](../Page/) template.
     */
    'use strict';

    var CORE_DIRECTIVES, FORM_DIRECTIVES, OverlayNav, Menu, MenuToggle, MenuClose, Button, Blur, Content, Scroll, Refresher, Slides, Slide, SlideLazy, Tabs, Tab, List, ListHeader, Item, ItemSliding, Toolbar, ToolbarTitle, ToolbarItem, Icon, Checkbox, Switch, TextInput, TextInputElement, Label, Segment, SegmentButton, RadioGroup, RadioButton, Searchbar, Nav, NavPush, NavPop, NavRouter, NavbarTemplate, Navbar, IdRef, ShowWhen, HideWhen, IONIC_DIRECTIVES;
    return {
        setters: [function (_angular2Angular2) {
            CORE_DIRECTIVES = _angular2Angular2.CORE_DIRECTIVES;
            FORM_DIRECTIVES = _angular2Angular2.FORM_DIRECTIVES;
        }, function (_componentsOverlayOverlay) {
            OverlayNav = _componentsOverlayOverlay.OverlayNav;
        }, function (_componentsMenuMenu) {
            Menu = _componentsMenuMenu.Menu;
        }, function (_componentsMenuMenuToggle) {
            MenuToggle = _componentsMenuMenuToggle.MenuToggle;
        }, function (_componentsMenuMenuClose) {
            MenuClose = _componentsMenuMenuClose.MenuClose;
        }, function (_componentsButtonButton) {
            Button = _componentsButtonButton.Button;
        }, function (_componentsBlurBlur) {
            Blur = _componentsBlurBlur.Blur;
        }, function (_componentsContentContent) {
            Content = _componentsContentContent.Content;
        }, function (_componentsScrollScroll) {
            Scroll = _componentsScrollScroll.Scroll;
        }, function (_componentsScrollPullToRefresh) {
            Refresher = _componentsScrollPullToRefresh.Refresher;
        }, function (_componentsSlidesSlides) {
            Slides = _componentsSlidesSlides.Slides;
            Slide = _componentsSlidesSlides.Slide;
            SlideLazy = _componentsSlidesSlides.SlideLazy;
        }, function (_componentsTabsTabs) {
            Tabs = _componentsTabsTabs.Tabs;
        }, function (_componentsTabsTab) {
            Tab = _componentsTabsTab.Tab;
        }, function (_componentsListList) {
            List = _componentsListList.List;
            ListHeader = _componentsListList.ListHeader;
        }, function (_componentsItemItem) {
            Item = _componentsItemItem.Item;
        }, function (_componentsItemItemSliding) {
            ItemSliding = _componentsItemItemSliding.ItemSliding;
        }, function (_componentsToolbarToolbar) {
            Toolbar = _componentsToolbarToolbar.Toolbar;
            ToolbarTitle = _componentsToolbarToolbar.ToolbarTitle;
            ToolbarItem = _componentsToolbarToolbar.ToolbarItem;
        }, function (_componentsIconIcon) {
            Icon = _componentsIconIcon.Icon;
        }, function (_componentsCheckboxCheckbox) {
            Checkbox = _componentsCheckboxCheckbox.Checkbox;
        }, function (_componentsSwitchSwitch) {
            Switch = _componentsSwitchSwitch.Switch;
        }, function (_componentsTextInputTextInput) {
            TextInput = _componentsTextInputTextInput.TextInput;
            TextInputElement = _componentsTextInputTextInput.TextInputElement;
        }, function (_componentsTextInputLabel) {
            Label = _componentsTextInputLabel.Label;
        }, function (_componentsSegmentSegment) {
            Segment = _componentsSegmentSegment.Segment;
            SegmentButton = _componentsSegmentSegment.SegmentButton;
        }, function (_componentsRadioRadio) {
            RadioGroup = _componentsRadioRadio.RadioGroup;
            RadioButton = _componentsRadioRadio.RadioButton;
        }, function (_componentsSearchbarSearchbar) {
            Searchbar = _componentsSearchbarSearchbar.Searchbar;
        }, function (_componentsNavNav) {
            Nav = _componentsNavNav.Nav;
        }, function (_componentsNavNavPush) {
            NavPush = _componentsNavNavPush.NavPush;
            NavPop = _componentsNavNavPush.NavPop;
        }, function (_componentsNavNavRouter) {
            NavRouter = _componentsNavNavRouter.NavRouter;
        }, function (_componentsNavbarNavbar) {
            NavbarTemplate = _componentsNavbarNavbar.NavbarTemplate;
            Navbar = _componentsNavbarNavbar.Navbar;
        }, function (_componentsAppId) {
            IdRef = _componentsAppId.IdRef;
        }, function (_componentsShowHideWhenShowHideWhen) {
            ShowWhen = _componentsShowHideWhenShowHideWhen.ShowWhen;
            HideWhen = _componentsShowHideWhenShowHideWhen.HideWhen;
        }],
        execute: function () {
            IONIC_DIRECTIVES = [
            // Angular
            CORE_DIRECTIVES, FORM_DIRECTIVES,
            // Content
            OverlayNav, Menu, MenuToggle, MenuClose, Button, Blur, Content, Scroll, Refresher,
            // Lists
            List, ListHeader, Item, ItemSliding,
            // Slides
            Slides, Slide, SlideLazy,
            // Tabs
            Tabs, Tab,
            // Toolbar
            Toolbar, ToolbarTitle, ToolbarItem,
            // Media
            Icon,
            // Forms
            Searchbar, Segment, SegmentButton, Checkbox, RadioGroup, RadioButton, Switch, TextInput, TextInputElement, Label,
            // Nav
            Nav, NavbarTemplate, Navbar, NavPush, NavPop, NavRouter, IdRef, ShowWhen, HideWhen];

            _export('IONIC_DIRECTIVES', IONIC_DIRECTIVES);
        }
    };
});