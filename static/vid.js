function compare(){
    const inputText = document.getElementById('vid_io').value;
    if (inputText != ""){
        fetch('/compare', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: inputText })
        })
        .then(response => response.json())
        .then(data => {
            // Show the results container only after we get the score
            document.getElementById('results').classList.remove('hidden');
            
            let probability = Math.round(data*100);
            document.getElementById('probabilityBar').style.width = probability + '%';
            document.getElementById('probabilityBar').textContent = "PT-PT: " + probability + '%';
            let remaining = 100 - probability;
            document.getElementById('remainingProbability').textContent = "PT-BR: " + remaining + '%';
        });
    }
}

function clearText(){
    // Hide the results container
    document.getElementById('results').classList.add('hidden');
    
    document.getElementById('vid_io').value = "";
    document.getElementById('probabilityBar').style.width = "50%";
    document.getElementById('probabilityBar').textContent = "PT-PT: " + 50 + '%';
    document.getElementById('remainingProbability').textContent = "PT-BR: " + 50 + '%';
}

function dragEnterHandler() {
    document.getElementById("vid_io").classList.add("drag-over");
}

function dragLeaveHandler() {
    document.getElementById("vid_io").classList.remove("drag-over");
}

function dropHandler(event) {
    event.preventDefault(); // Prevent the default behavior to allow dropping
    document.getElementById("vid_io").classList.remove("drag-over");
    const file = event.dataTransfer.files[0]; // Get the first dropped file

    if (file) {
        if (file.type === "application/pdf") {
            // Handle PDF file
            const reader = new FileReader();
            reader.onload = function(e) {
                const typedArray = new Uint8Array(e.target.result);

                pdfjsLib.getDocument(typedArray).promise.then(function(pdf) {
                    let textContent = "";
                    const numPages = pdf.numPages;

                    // Array de promessas para extrair texto de cada página
                    const pagePromises = [];
                    for (let i = 1; i <= numPages; i++) {
                        pagePromises.push(
                            pdf.getPage(i).then(function(page) {
                                return page.getTextContent().then(function(textContentObj) {
                                    // Extrai e junta apenas o texto das partes do PDF
                                    textContentObj.items.forEach(function(item) {
                                        textContent += item.str + " ";
                                    });
                                });
                            })
                        );
                    }

                    // Quando todas as promessas forem resolvidas, atualiza o campo de texto
                    Promise.all(pagePromises).then(function() {
                        document.getElementById("vid_io").value = textContent.trim(); // Remove espaços extras
                    });
                });
            };
            reader.readAsArrayBuffer(file); // Lê o arquivo como um ArrayBuffer
        } else if (file.type === "text/plain") {
            // Handle text file
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById("vid_io").value = e.target.result; // Define o conteúdo do arquivo na área de texto
            };
            reader.readAsText(file); // Lê o arquivo como texto
        } else {
            alert("Por favor, insira um arquivo de texto ou PDF válido.");
        }
    } else {
        alert("Por favor, insira um arquivo válido.");
    }
}

window.addEventListener("dragover", function(event) {
    event.preventDefault();
});

window.addEventListener("drop", function(event) {
    event.preventDefault();
});

window.addEventListener("scroll", () => {
    const reveals = document.querySelectorAll(".reveal");

    for(let i = 0; i < reveals.length; i++){
        let windowheight = window.innerHeight;
        revealtop = reveals[i].getBoundingClientRect().top;
        const revealpoint = 150;
        if(revealtop < windowheight - revealpoint){
            reveals[i].classList.add("active");
        }
        else{
            reveals[i].classList.remove("active");
        }
    }

});

function handleKeyPress(event) {
    // Check for cmd+return (Mac) or ctrl+return (Windows)
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        event.preventDefault(); // Prevent default behavior
        compare(); // Call the compare function
    }
}