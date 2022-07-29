#### Worker - 101
##### Calls Jsonplaceholder user api and caches (simple cache) the results for three minutes (check the date field in response)

- Currently Jsonplaceholder user api does not allow filter other than id field filter.
- This worker does additional filtering based on name, username, email, website fields (all of these results are cached as well)

##### Deployed worker Url
[https://general.goutham.workers.dev/](https://general.goutham.workers.dev/)