export function Pdf() {
    return (
        <object
            data="./de-toan.pdf"
            type="application/pdf"
            width="100%"
            height="600px"
        >
            <p>
                Alternative text - include a link{" "}
                <a href="http://africau.edu/images/default/sample.pdf">
                    to the PDF!
                </a>
            </p>
        </object>
    );
}
