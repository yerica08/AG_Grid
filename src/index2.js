let selectedMake;

    const columnDefs = [
      { field: 'make', headerName: '제조', width: 120, pinned: 'left' },
      { field: 'model' },
      { field: 'price' },
      { field: 'electric' }
    ];

    const rowData = [
      { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
      { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
      { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
      { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
      { make: 'Fiat', model: '500', price: 15774, electric: false },
      { make: 'Nissan', model: 'Juke', price: 20675, electric: false },
    ];

    const gridOptions = {
      columnDefs,
      rowData,
    //   rowHeight: 30,
    //   getRowId: (params) => params.data.make,
    //   domLayout: 'autoHeight',

      /*
      index2.js:46 AG Grid: 'paginationPageSize=15', but 15 is not included in the default paginationPageSizeSelector=[20, 50, 100].
(익명) @ ag-grid-community.min.noStyle.js:1
u @ ag-grid-community.min.noStyle.js:1
p @ ag-grid-community.min.noStyle.js:1
reloadPageSizesSelector @ ag-grid-community.min.noStyle.js:1
toggleSelectDisplay @ ag-grid-community.min.noStyle.js:1
postConstruct @ ag-grid-community.min.noStyle.js:1
(익명) @ ag-grid-community.min.noStyle.js:1
initBeans @ ag-grid-community.min.noStyle.js:1
createBean @ ag-grid-community.min.noStyle.js:1
createBean @ ag-grid-community.min.noStyle.js:1
createComponentFromElement @ ag-grid-community.min.noStyle.js:1
(익명) @ ag-grid-community.min.noStyle.js:1
createChildComponentsFromTags @ ag-grid-community.min.noStyle.js:1
wireTemplate @ ag-grid-community.min.noStyle.js:1
setTemplateFromElement @ ag-grid-community.min.noStyle.js:1
setTemplate @ ag-grid-community.min.noStyle.js:1
postConstruct @ ag-grid-community.min.noStyle.js:1
(익명) @ ag-grid-community.min.noStyle.js:1
initBeans @ ag-grid-community.min.noStyle.js:1
createBean @ ag-grid-community.min.noStyle.js:1
(익명) @ ag-grid-community.min.noStyle.js:1
create @ ag-grid-community.min.noStyle.js:1
uh @ ag-grid-community.min.noStyle.js:1
(익명) @ index2.js:46
index2.js:46 AG Grid: Either set 'paginationPageSizeSelector' to an array that includes 15 or to 'false' to disable the page size selector.
(익명) @ ag-grid-community.min.noStyle.js:1
u @ ag-grid-community.min.noStyle.js:1
p @ ag-grid-community.min.noStyle.js:1
reloadPageSizesSelector @ ag-grid-community.min.noStyle.js:1
toggleSelectDisplay @ ag-grid-community.min.noStyle.js:1
postConstruct @ ag-grid-community.min.noStyle.js:1
(익명) @ ag-grid-community.min.noStyle.js:1
initBeans @ ag-grid-community.min.noStyle.js:1
createBean @ ag-grid-community.min.noStyle.js:1
createBean @ ag-grid-community.min.noStyle.js:1
createComponentFromElement @ ag-grid-community.min.noStyle.js:1
(익명) @ ag-grid-community.min.noStyle.js:1
createChildComponentsFromTags @ ag-grid-community.min.noStyle.js:1
wireTemplate @ ag-grid-community.min.noStyle.js:1
setTemplateFromElement @ ag-grid-community.min.noStyle.js:1
setTemplate @ ag-grid-community.min.noStyle.js:1
postConstruct @ ag-grid-community.min.noStyle.js:1
(익명) @ ag-grid-community.min.noStyle.js:1
initBeans @ ag-grid-community.min.noStyle.js:1
createBean @ ag-grid-community.min.noStyle.js:1
(익명) @ ag-grid-community.min.noStyle.js:1
create @ ag-grid-community.min.noStyle.js:1
uh @ ag-grid-community.min.noStyle.js:1
(익명) @ index2.js:46

      */
    //   pagination: true,
    //   paginationPageSize: 15,
    //   paginationPageSizeSelector: [15, 25, 100],
    //   defaultColDef: {
    //     sortable: true,
    //     filter: true,
    //     floatingFilter: true,
    //     onCellClicked: (e) => {
    //       selectedMake = e.data.make;
    //       gridOptions.api.redrawRows({ rowNodes: [e.node] });
    //     }
    //   },
    //   getRowClass: (params) => {
    //     return params.data.make === selectedMake ? 'selected-make' : '';
    //   },
      rowSelection: {
        mode: 'multiRow', // 'multiRow'또는 'singleRow'
        enableSelectionWithoutKeys: true // ✅Ctrl 없이 다중 선택
      }
    };

    const eGridDiv = document.getElementById('myGrid');
    agGrid.createGrid(eGridDiv, gridOptions);

    // document.getElementById('quickFilterInput').addEventListener('input', (e) => {
    //   gridOptions.api.setQuickFilter(e.target.value);
    // });

    // document.getElementById('clearFilterBtn').addEventListener('click', () => {
    //   document.getElementById('quickFilterInput').value = '';
    //   gridOptions.api.setQuickFilter('');
    //   gridOptions.api.setFilterModel(null);
    //   gridOptions.api.onFilterChanged();
    // });