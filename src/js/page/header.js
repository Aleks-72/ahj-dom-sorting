export default class Header {
    constructor(element) {
        this._elements = element
    };

    generateHeader() {
        const header = document.createElement("header");
        const headerName = document.createElement("h1");
        headerName.textContent = "Table with sorts";
        header.append(headerName);
        this._elements.append(header)
    }
}