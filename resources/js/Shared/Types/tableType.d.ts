import React from "react";

type MetaTable = {
    column: ColumnTable;
};

type ColumnTable = {
    name?: string;
    label?: string;
    isAction?: boolean;
    rowTransform?: (value: any, itemRow: any) => React.JSX.Element | string;
};

type DataTable = [];

declare function Table<T extends Record<any, any>[], C extends ColumnTable<T>>(
    props: C
): React.JSX.Element;
