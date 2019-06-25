import { Injectable } from '@angular/core';

@Injectable()
export class TreeviewConfig {
    hasAllCheckBox = true;
    hasFilter = false;
    hasCollapseExpand = false;
    decoupleChildFromParent = false;
    showIfUnchecked = true;
    maxHeight = 500;
    collapsed = false;

    get hasDivider(): boolean {
        return this.hasFilter || this.hasAllCheckBox || this.hasCollapseExpand;
    }

    public static create(fields?: {
        hasAllCheckBox?: boolean,
        hasFilter?: boolean,
        hasCollapseExpand?: boolean,
        decoupleChildFromParent?: boolean
        showIfUnchecked?: boolean
        maxHeight?: number,
        collapsed?: boolean,
    }): TreeviewConfig {
        const config = new TreeviewConfig();
        Object.assign(config, fields);
        return config;
    }
}
