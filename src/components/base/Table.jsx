import style from "./Table.module.css";

const Table = ({
	headers,
	keys,
	data,
	page,
	limit,
	width = "100%",
	height = "100%",
	onRowClick
}) => (
	<table
		className={style.table}
		style={{ width, height }}
	>
		<TableHeader
			headers={headers}
		/>
		<TableBody
			data={data}
			keys={keys}
			page={page}
			limit={limit}
			onRowClick={onRowClick}
		/>
	</table>
);

const TableHeader = ({ headers }) => (
	<thead>
		<tr>
			{headers.map((header, idx) => (
				<th key={idx}>
					{header}
				</th>
			))}
		</tr>
	</thead>
);

const TableBody = ({
	data,
	keys,
	page,
	limit,
	onRowClick
}) => (
	<tbody>
		{data.map((row, rowIdx) => (
			<tr
				key={rowIdx}
				onClick={() => onRowClick?.(row)}
				style={{ cursor: "pointer" }}
			>
				<td className={style.td}>{(page - 1) * limit + rowIdx + 1}</td>
				{keys.map((key, colIdx) => (
					<td
						key={colIdx}
						className={
							(key === "crewName" && row[key] === "관리자")
								? style.role
								: (key === "title")
									? style.wideColumn
									: (key === "createdAt")
										? style.createdAt
										: ""
						} >
						{row[key]}
					</td>
				))}
			</tr>
		))}
	</tbody>
);

export { Table };
