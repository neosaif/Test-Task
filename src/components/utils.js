
export function filterQuery(params) {
    var query = '';
    for(const [key, value] of  Object.entries(params)) {
        if (value != null && value != undefined)
            query += `${key}=${encodeURIComponent(value)}&`;
    }
    query = query.substring(0, query.length - 1);
    return query;
} 