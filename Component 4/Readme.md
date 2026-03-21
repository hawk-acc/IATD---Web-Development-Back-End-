## Component 4
### Caching:
#### Report on how would you implement caching strategies to handle a large number of courses efficiently.
I would implement the in-memory caching that use either Redis or Memcached to cache frequently accessed data and reduce the load on database. Also, HTTP caching can be a great idea to enable client-side caching and reduce server load.
As well as CDN (Content Dynamic Network) can be used to allow the users to access the closest server in their geographical region.

#### Plan for cache invalidation
To implement cache invalidation strategies, we need to ensure that cached data remains up to date. This can be achieved by setting conditions to remove cached items after a certain period of time or by using event-driven invalidation when data changes.


### Load Balancing:
#### Report on how would you distribute incoming requests across multiple instances of your Express server.
I would use the splitting strategy also known as horizontal scaling, i.e. load balancers (e.g. NGINX, HAProxy) to distribute incoming requests across multiple instances of my Express server. 

### High Availability:
#### Report on how would you ensure high availability for your backend application, especially in disaster scenarios.

In general, we provide redundancy to ensure high availability of backend application. Cloning is one way to counter the availability issue. Node.js offers the cluster module to streamline the process of replicating and managing instances on a single server. It enables seamless application restarts, and ensuring zero downtime. 


#### Report on how would you implement high availability for the MongoDB database in a production environment. 

MongoDB Atlas supports multi‑region and multi‑cloud clusters, ensuring data is replicated across diverse locations and providers. I will utilise this architecture to minimises latency while significantly reducing the risk of downtime caused by regional failures or cloud provider outages.