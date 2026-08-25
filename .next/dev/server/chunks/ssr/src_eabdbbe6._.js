module.exports = [
"[project]/src/data/blogPosts.ts [app-rsc] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/src_data_blogPosts_ts_91f2c77c._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/data/blogPosts.ts [app-rsc] (ecmascript)");
    });
});
}),
"[project]/src/storage/database/db.ts [app-rsc] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/src_storage_database_db_ts_7de42dde._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/storage/database/db.ts [app-rsc] (ecmascript)");
    });
});
}),
];