import { router } from "@inertiajs/react";
import { Button, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";

export default function Table({
    data = [],
    options = {},
    meta = {},
    filter = {},
    urlIndex = "",
}) {
    const [tableHead, setTableHead] = useState([{ label: "", name: "" }]);

    useEffect(() => {
        setTableHead(
            options?.column?.map((v, i) => {
                let optionHead = { label: v.label, name: v.name };
                if ("className" in v) {
                    optionHead.className = v.className;
                }
                return optionHead;
            })
        );
    }, [options]);

    // useEffect(() => {

    //     router.get(urlIndex, { ...filter }, { preserveState: true });
    // }, [filter]);

    function handlePaginate(page) {
        router.get(urlIndex, { page, ...filter }, { preserveState: true });
    }
    return (
        <>
            <div className="overflow-auto max-w-full mt-2">
                {data !== null && data.length > 0 ? (
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {tableHead.map((v, index) => (
                                    <th
                                        key={index + "Column"}
                                        className={
                                            v?.className +
                                            " border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                        }
                                    >
                                        {v.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item, indexItem) => {
                                return (
                                    <tr key={"row" + indexItem}>
                                        {options?.column?.map(
                                            (col, indexCol) => (
                                                <td
                                                    key={
                                                        indexCol + "ColumnItem"
                                                    }
                                                    className={
                                                        indexCol === 2
                                                            ? "p-4"
                                                            : "p-4 border-b border-blue-gray-50"
                                                    }
                                                >
                                                    {"rowTransform" in col ? (
                                                        col.rowTransform(
                                                            col?.isAction
                                                                ? null
                                                                : item[
                                                                      col.name
                                                                  ],
                                                            item
                                                        )
                                                    ) : (
                                                        <Typography variant="paragraph">
                                                            {item[col.name]}
                                                        </Typography>
                                                    )}
                                                </td>
                                            )
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <Typography
                        variant="paragraph"
                        className="text-center mt-4"
                    >
                        There is no data here.
                    </Typography>
                )}
            </div>
            {data !== null && data.length > 0 && (
                <div className="w-full flex flex-row justify-center items-center mt-3 gap-2">
                    <Button
                        variant="outlined"
                        disabled={meta.currentPage === 1}
                        onClick={() => handlePaginate(meta.currentPage - 1)}
                    >
                        {"<"}
                    </Button>
                    {[...Array(meta.lastPage).keys()].map((v) => (
                        <Button
                            variant="outlined"
                            disabled={meta.currentPage === v + 1}
                            onClick={() => handlePaginate(v + 1)}
                        >
                            {v + 1}
                        </Button>
                    ))}
                    <Button
                        variant="outlined"
                        disabled={meta.currentPage === meta.lastPage}
                        onClick={() => handlePaginate(meta.currentPage + 1)}
                    >
                        {">"}
                    </Button>
                </div>
            )}
        </>
    );
}
