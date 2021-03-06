import {isBoolean, isNil, isString} from 'lodash';
import {TreeviewHelper} from './treeview-helper';

export interface TreeviewSelection {
    checkedItems: TreeviewItem[];
    uncheckedItems: TreeviewItem[];
}

export interface TreeItem {
    text: string;
    value: any;
    disabled?: boolean;
    checked?: boolean;
    collapsed?: boolean;
    children?: TreeItem[];
    parent?: TreeItem;
}

export class TreeviewItem {
    private internalDisabled = false;
    private internalChecked = true;
    private internalCollapsed = false;
    private internalChildren: TreeviewItem[] = [];
    parent: TreeviewItem;
    text: string;
    value: any;

    constructor(item: TreeItem, autoCorrectChecked = false, parent?: TreeviewItem) {
        if (isNil(item)) {
            throw new Error('Item must be defined');
        }
        if (isString(item.text)) {
            this.text = item.text;
        } else {
            throw new Error('A text of item must be string object');
        }
        this.value = item.value;
        if (isBoolean(item.checked)) {
            this.checked = item.checked;
        }
        if (isBoolean(item.collapsed)) {
            this.collapsed = item.collapsed;
        }
        if (isBoolean(item.disabled)) {
            this.disabled = item.disabled;
        }
        if (!isNil(item.children) && item.children.length > 0) {
            this.children = item.children.map(child => {
                if (this.disabled === true) {
                    child.disabled = true;
                }

                return new TreeviewItem(child, autoCorrectChecked, this);
            });
        }

        if (parent) {
            this.parent = parent;
        }
    }

    get checked(): boolean {
        return this.internalChecked;
    }

    set checked(value: boolean) {
        if (!this.internalDisabled) {
            if (this.internalChecked !== value) {
                this.internalChecked = value;
            }
        }
    }

    get indeterminate(): boolean {
        return this.checked === undefined;
    }

    setCheckedRecursive(value: boolean) {
        if (!this.internalDisabled) {
            this.internalChecked = value;
            if (!isNil(this.internalChildren)) {
                this.internalChildren.forEach(child => child.setCheckedRecursive(value));
            }
        }
    }

    /**
     * This method returns the visibility depending if the item is not disabled and is checked
     */
    getVisibility() {
        return this.checked && this.disabled === false;
    }

    get disabled(): boolean {
        this.internalDisabled = false;
        if (this.parent instanceof TreeviewItem
            && (undefined === this.parent.checked ||
                false === this.parent.checked ||
                true === this.parent.disabled)) {
            this.internalDisabled = true;
        }
        return this.internalDisabled;
    }


    set disabled(value: boolean) {
        if (this.internalDisabled !== value) {
            this.internalDisabled = value;
            if (!isNil(this.internalChildren)) {
                this.internalChildren.forEach(child => child.disabled = value);
            }
        }
    }

    get collapsed(): boolean {
        return this.internalCollapsed;
    }

    set collapsed(value: boolean) {
        if (this.internalCollapsed !== value) {
            this.internalCollapsed = value;
        }
    }

    setCollapsedRecursive(value: boolean) {
        this.internalCollapsed = value;
        if (!isNil(this.internalChildren)) {
            this.internalChildren.forEach(child => child.setCollapsedRecursive(value));
        }
    }

    get children(): TreeviewItem[] {
        return this.internalChildren;
    }

    set children(value: TreeviewItem[]) {
        if (this.internalChildren !== value) {
            if (!isNil(value) && value.length === 0) {
                throw new Error('Children must be not an empty array');
            }
            this.internalChildren = value;
            if (!isNil(this.internalChildren)) {
                let checked = null;
                this.internalChildren.forEach(child => {
                    if (checked === null) {
                        checked = child.checked;
                    } else {
                        if (child.checked !== checked) {
                            checked = undefined;
                            return;
                        }
                    }
                });
                if (undefined !== checked) {
                    // todo: review this! why the parent should change depending on the children state for the checked property?
                    // this.internalChecked = checked;
                }
            }
        }
    }

    appendChildren(item: TreeviewItem) {
        item.parent = this;
        this.children.push(item);
    }

    getSelection(): TreeviewSelection {
        let checkedItems: TreeviewItem[] = [];
        let uncheckedItems: TreeviewItem[] = [];
        if (this.internalChildren.length <= 0) {
            if (this.internalChecked) {
                checkedItems.push(this);
            } else {
                uncheckedItems.push(this);
            }
        } else {
            const selection = TreeviewHelper.concatSelection(this.internalChildren, checkedItems, uncheckedItems);
            checkedItems = selection.checked;
            uncheckedItems = selection.unchecked;
        }

        return {
            checkedItems: checkedItems,
            uncheckedItems: uncheckedItems
        };
    }
}
