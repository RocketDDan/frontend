import style from "./Table.module.css";

const formatMoney = (number) => {
	return number.toLocaleString();
}

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
									? style.titleColumn
									: (key === "createdAt")
										? style.createdAt
										: (key === "email")
											? style.email
											: (key === "crewName")
												? style.crewName
												: ""
						} >
						<span>
							{(key === "createdAt")
								? row[key].slice(0, -3)
								: (key === "balance" || key == "chargeAmount")
									? formatMoney(row[key]) + "원"
									: row[key]}
						</span>


					</td>
				))}
			</tr>
		))}
	</tbody>
);

export { Table };
