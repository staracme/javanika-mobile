require("./scrollbooster.min.js");
export class sb {

    sb(_viewport, _content) {
        new ScrollBooster({
            viewport: _viewport,
            content: _content,
            // textSelection: true,
            emulateScroll: true,
            onClick: (data, event) => {
                //event.preventDefault()
            },
            shouldScroll: (data, event) => {
                if (event.target.tagName == 'BUTTON') {
                    return false
                } else {
                    return true
                }
            },
            onUpdate: (data) => {
                // viewport.scrollLeft = data.position.x
                // viewport.scrollTop = data.position.y
                content.style.transform = `translate(
                            ${-data.position.x}px,
                            ${-data.position.y}px
                          )`
            }
        });
    }
}

// let scr = new ScrollBooster({
//     viewport: viewport,
//     content: content,
//     // textSelection: true,
//     emulateScroll: true,
//     onClick: (data, event) => {
//         //event.preventDefault()
//     },
//     shouldScroll: (data, event) => {
//         if (event.target.tagName == 'BUTTON') {
//             return false
//         } else {
//             return true
//         }
//     },
//     onUpdate: (data) => {
//         // viewport.scrollLeft = data.position.x
//         // viewport.scrollTop = data.position.y
//         content.style.transform = `translate(
//                 ${-data.position.x}px,
//                 ${-data.position.y}px
//               )`
//     }
// });