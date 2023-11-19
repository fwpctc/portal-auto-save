console.log("Injecting AutoSave")

function getAssignmentId() {
    hashsplit = window.location.hash.split("/")
    id = hashsplit.slice(1, 3).join("-")
    return id
}

window.addEventListener("hashchange", (e) => {
    console.log(e)
    if (e.newURL.includes("assignmentdetail")) {
        autoSave()
        loadSave()
    }
})

if (window.location.href.includes("assignmentdetail")) {
    autoSave()
    loadSave()
}

function autoSave() {
    setTimeout(() => {
        console.log("Activating AutoSave")
        var ele = document.getElementsByTagName("iframe")[0].contentDocument.getElementById("tinymce")

observer = new MutationObserver(function(mutationsList, observer) {

    console.log(mutationsList)
    window.localStorage.setItem(getAssignmentId(), ele.innerHTML)
});

// call 'observe' on that MutationObserver instance, 
// passing it the element to observe, and the options object
observer.observe(ele, {characterData: true, childList: true, attributes: false, subtree:true});

document.getElementById("sub-button").onclick = () => {
    setTimeout(() => {
    document.getElementById("resubmit-confirm-button").onclick = () => {
        window.localStorage.removeItem(getAssignmentId())
    }
    }, 100)
}
        }, 1000)
       
}

function loadSave() {
    if (window.localStorage.getItem(getAssignmentId()) != null) {
    setTimeout(() => {
        console.log("Loading Save")
        var ele = document.getElementsByTagName("iframe")[0].contentDocument.getElementById("tinymce")
        ele.innerHTML = window.localStorage.getItem(getAssignmentId())
    }, 1000)
}
}

// var ele = document.getElementsByTagName("iframe")[0].contentDocument.getElementById("tinymce")

// observer = new MutationObserver(function(mutationsList, observer) {
//     window.localStorage.setItem(getAssignmentId(), mutationsList.at(-1).target.nodeValue)
// });

// // call 'observe' on that MutationObserver instance, 
// // passing it the element to observe, and the options object
// observer.observe(ele, {characterData: true, childList: false, attributes: false, subtree:true});