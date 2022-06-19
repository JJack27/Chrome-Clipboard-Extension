var CONTEXT_MENU_CONTENTS = [{
        "jiangna": [{
                "wulan": [
                    "name1-0",
                    "name2-0",
                    "password-0"
                ]
            },
            {
                "beijing4": [
                    "name1-1",
                    "name2-1",
                    "password-1"
                ]
            }
        ]
    },
    "test",
    {
        "guangqipoc": [{
                "wulan": [
                    "name1-0",
                    "name2-0",
                    "password-0"
                ]
            },
            {
                "beijing4": [
                    "name1-1",
                    "name2-1",
                    "password-1"
                ]
            }
        ]
    },
]

function isLeaf(item) {
    return item instanceof String;
}

function buildTree(root, parentId) {
    if (root instanceof Array) {
        // Loop over the list to browse
        root.forEach((item) => {
            buildTree(item, parentId);
        });
    } else if (root instanceof Object) {
        // A menu with sub menus
        if (Object.keys(root).length != 1) {
            throw `Invalid item = ${root}`
        }
        let title = Object.keys(root)[0];
        let id = `${parentId}/${title}`;
        createContextItems(title, id, parentId);
        root[title].forEach((item) => {
            buildTree(item, id);
        });
    } else {
        // Leaf nodes
        createContextItems(root, `${parentId}/${root}`, parentId);
    }
}

function createContextItems(title, id, parentId, context = "") {
    if (parentId === null) {
        chrome.contextMenus.create({
            title: title,
            id: id,
            contexts: ['all']
        });
    } else {
        chrome.contextMenus.create({
            title: title,
            id: id,
            parentId: parentId,
            contexts: ['all']
        });
    }
}

function setUpContextMenus() {
    buildTree(CONTEXT_MENU_CONTENTS, null);
}

function copyToClipboard() {
    chrome.storage.sync.get('content', (content) => {
        navigator.clipboard.writeText(content['content']).then(() => {
            let activeElement = document.activeElement;
            if (activeElement.tagName === 'INPUT') {
                activeElement.value = content['content'];
            }
        })
    })
}
chrome.contextMenus.onClicked.addListener(async (itemData) => {
    let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });
    let title = itemData.menuItemId.split('/').pop();
    chrome.storage.sync.set({
        "content": title
    });
    chrome.scripting.executeScript({
        target: {
            tabId: tab.id
        },
        function: copyToClipboard,
    });
});



chrome.runtime.onInstalled.addListener(function () {
    // When the app gets installed, set up the context menus
    setUpContextMenus();
});