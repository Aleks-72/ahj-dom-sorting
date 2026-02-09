export default class Table {
    constructor(element) {
        const table = document.createElement("table");
        element.appendChild(table);
        this._element = table;
    };

    renderTable(filmsList) {
        const tableHeaders = document.createElement("tr");
        for (let header of ['id', 'title', 'year', 'imdb']) {
            const tableHeader = document.createElement('th');
            tableHeader.classList.add('sort-icon');
            tableHeader.textContent = header;
            tableHeaders.appendChild(tableHeader);
        };
        this._element.appendChild(tableHeaders);
        for (let film of filmsList) {
            const tableRow = document.createElement('tr');
            tableRow.dataset.id = film.id;
            tableRow.dataset.title = film.title;
            tableRow.dataset.year = film.year;
            tableRow.dataset.imbd = film.imdb;
            for (let attribute of [film.id, film.title, `(${film.year})`, `imdb: ${film.imdb.toFixed(2)}`]) {
                const tableData = document.createElement('td');
                tableData.textContent = attribute;
                tableRow.appendChild(tableData);
            };
            this._element.appendChild(tableRow);
        }
    }

    sortTable(column = 'id', type = 'up') {
        if (type !== 'up' && type !== 'down') {
            throw new Error("Неверный порядок сортировки")
        };
        const tableRows = this._element.querySelectorAll('tr:has(td)');
        let ids = []
        if (column === 'title') {
            for (let node of tableRows) {
                ids.push(node.dataset[column]);
            };
            ids.sort((a, b) => a.localeCompare(b, 'ru'));
        } else if (['id', 'year', 'imdb'].includes(column)) {
            for (let node of tableRows) {
                ids.push(+node.dataset[column]);
            };
            ids.sort((a, b) => a - b);
        } else {
            throw new Error('Передан неверный параметр колонки');
        }
        if (type === 'down') {
            ids.reverse()
        }
        console.log(ids)
        tableRows.forEach((row, index) => {
            console.log(row.dataset[column])
            const i = ids.indexOf(+row.dataset[column])
            if (i !== index) {
                console.log(`Меняем местами ${i} и ${index}`)
                this._element.insertBefore(row, tableRows[i])
            }
        })

        const tableHeaders = this._element.querySelectorAll('th');
        tableHeaders.forEach((header) => {
            if (header.textContent === column) {
                header.classList.remove(type === 'down' ? "sorted-up" : "sorted-down");
                header.classList.add(type === 'up' ? "sorted-up" : "sorted-down");
            } else {
                header.classList.remove("sorted-up");
                header.classList.remove("sorted-down");
            }
        })
    }
}