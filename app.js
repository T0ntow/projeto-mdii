var nodes = null;
var edges = null;
var network = null;
// randomly create some nodes and edges
var seed = 2;
var data = {
  nodes: nodes,
  edges: edges
};
function setDefaultLocale() {
  var defaultLocal = navigator.language;
  var select = document.getElementById("locale");
  select.selectedIndex = 0; // set fallback value
  for (var i = 0, j = select.options.length; i < j; ++i) {
    if (select.options[i].getAttribute("value") === defaultLocal) {
      select.selectedIndex = i;
      break;
    }
  }
}
var nodes = new vis.DataSet([
  { id: 1, label: 'Node 1' },
  { id: 2, label: 'Node 2' },
  { id: 3, label: 'Node 3' },
  { id: 4, label: 'Node 4' },
  { id: 5, label: 'Node 5' }
]);
function destroy() {
  if (network !== null) {
    network.destroy();
    network = null;
  }
}

function draw() {
  destroy();
  nodes = [];
  edges = [];

  // create a network
  let container = document.getElementById("mynetwork");
  let options = {
    physics:{
      enabled: false,
    },

    layout: { randomSeed: seed }, // just to make sure the layout is the same when the locale is changed
    locale: document.getElementById("locale").value,
    interaction: { keyboard: true },
    manipulation: {
      addNode: function (nodeData, callback) {
        // filling in the popup DOM elements
        document.getElementById("operation").innerText = "Add Node";
        document.getElementById("node-id").value = nodeData.id;
        document.getElementById("node-label").value = nodeData.label;
        document.getElementById("saveButton").onclick = saveData.bind(
          this,
          nodeData,
          callback
        );
        document.getElementById("cancelButton").onclick = clearPopUp.bind();
        document.getElementById("network-popUp").style.display = "block";
      },
      editNode: function (nodeData, callback) {
        // filling in the popup DOM elements
        document.getElementById("operation").innerText = "Edit Node";
        document.getElementById("node-id").value = nodeData.id;
        document.getElementById("node-label").value = nodeData.label;
        document.getElementById("saveButton").onclick = saveData.bind(
          this,
          nodeData,
          callback
        );
        document.getElementById("cancelButton").onclick = cancelEdit.bind(
          this,
          callback
        );
        document.getElementById("network-popUp").style.display = "block";
      },
      addEdge: function (nodeData, callback) {
        if (nodeData.from == nodeData.to) {
          var r = confirm("Do you want to connect the node to itself?");
          if (r == true) {
            callback(nodeData);
          }
        } else {
          callback(nodeData);
        }
      },
    },
    nodes: {
      borderWidth: 0,
      shape: 'box',
      size: 45,
      color: {
        border: '#222',
        background: 'white'
      },
      font: {
        color: 'black',
        size: 20,
        strokeColor: '#222'
      }
     
    },
    edges: {
      color: {
        color: '#aaa',
        highlight: '#4870DB'
      },
      width: 3,
      length: 275,
      hoverWidth: .05
    },
  };
  network = new vis.Network(container, data, options);
}

function clearPopUp() {
  document.getElementById("saveButton").onclick = null;
  document.getElementById("cancelButton").onclick = null;
  document.getElementById("network-popUp").style.display = "none";
}

function cancelEdit(callback) {
  clearPopUp();
  callback(null);
}

function saveData(nodeData, callback) {
  nodeData.id = document.getElementById("node-id").value;
  nodeData.label = document.getElementById("node-label").value;
  clearPopUp();
  callback(nodeData);
}

function init() {
  setDefaultLocale();
  draw();
}

window.addEventListener("load", () => {
  init();
});

function deleteSelected() {
  network.deleteSelected()
}