import {Injectable} from '@angular/core';
import {TreeviewItem} from '../../lib';

export class BookService {
    getBooks(): TreeviewItem[] {
        const arcmediaDW = {
            value: '572876a1-c271-4426-99f2-8694b78ee8f3',
            text: 'ArcMedia',
            checked: true,
            children: [
                {
                    value: '3b64ed52-021d-4dc5-959c-02b29b031114',
                    text: 'PHP',
                    checked: false,
                    children: [
                        {
                            value: '09c46f6b-c18a-4ab8-a953-9fb2fb866521',
                            text: 'Symfony',
                            checked: true,
                            children: [
                                {
                                    value: '1ce85af1-1678-4b22-8fe2-b8aa416f7369',
                                    text: 'Events',
                                    checked: true,
                                    children: []
                                }]
                        },
                        {
                            value: '840ce963-e22d-4aea-b323-ab8bfbe01a3e',
                            text: 'Service container',
                            checked: true,
                            children: []
                        }]
                },
                {
                    value: '7447c52a-a016-4996-b834-3b44bf2ced3c',
                    text: 'NET',
                    checked: false,
                    children: []
                },
                {
                    value: 'afc8f73d-fda4-4306-bf0d-7c018cc9818a',
                    text: 'Angular',
                    checked: false,
                    children: [
                        {
                            value: 'bc300b23-7e70-4ab9-95a2-2d966ff1f4db',
                            text: 'Components',
                            checked: false,
                            children: []
                        }, {
                            value: 'ac5dc452-4d6a-4144-9f2d-6056963bff03',
                            text: 'Directives',
                            checked: false,
                            children: []
                        }
                    ]
                }
            ]
        };
        return [new TreeviewItem(arcmediaDW)];
    }
}
