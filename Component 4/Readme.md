### Caching:
#### Report on how would you implement caching strategies to handle a large number of courses efficiently.
Let's imagine if we have big data containing a large number of courses in our app. Handling the high frequency of users' responses can be quite challenging. It could potentially slow down the server or make it crash.
We can implement HTTP caching that enables client-side caching and reduce server load.
CDN (Content Dynamic Network) can be used to allow the users to access the closest server in their geographical region if one of the servers fails to load.

#### Plan for cache invalidation
In many cases, the cached data could be outdated due to the updated data occurred in the web application. In our example, the microcourse app might have some changes in the courses content due to renewer of learning outcome and description. The user might still have the out-of-date cached data stored in their computer. To achieve this cache invalidation strategies, we set the conditions to remove cached items after a certain period of time or by using event-driven invalidation when data changes, i.e. course update or course delete will be executed.


### Load Balancing:
#### Report on how would you distribute incoming requests across multiple instances of your Express server.
As the web application grows, it would be thoughtful to have good strategies for handling the incoming requests across multiple instances of my Express server. 
* Use a load balancer to distribute requests
	* Spread traffic evenly - prevent users' requests overloading
 		* In our example, there could a big number of users accessing the app in one go. To prevent it from overloading, this strategy works very well.
    * Improve reliability - Redundancy (the app stays online) & Automatic Failover 
        * In our example, if one of the servers goes down, traffic will automatically be rerouted to the healthy servers, and users will never notice the failure.

### High Availability:
#### Report on how would you ensure high availability for your backend application, especially in disaster scenarios.

To ensure high availability for my backend application, I would design the system so that it can continue operating even when individual components fail or an entire region becomes unavailable. My approach focuses on redundancy, fault tolerance, and automated recovery.

* Run multiple instances of the backend by using horizontal scaling strategy. Rather than running one instances, I prefer to go with multiple instances of my Express server.
* Use a load balancer by monitoring all instances as health checks that allows automated recovery.
* Deploy across multiple zones or regions. In real world scenario, there could be any unpredictable disaster events, such as data center outage, power failure or natural disaster that could cause the lost of server connection. To prevent the limited availability from happening, we should deploy multiple instances across multiple available zones. We could use a load balancers to reroute the traffic to closest available region. Also, we need to ensure the database are replicated in different zones as well.


#### Report on how would you implement high availability for the MongoDB database in a production environment. 

To ensure high availability for the MongoDB database used in the microcourse app, I would deploy MongoDB using a replica set architecture combined with multi‑zone distribution, automated failover, and continuous backups. This design ensures that the database remains operational even if individual nodes or entire availability zones fail.

1. Deploy MongoDB as a replica set (Primary and secondaries)
   * Primary node - handles all write operations
   * Secondary nodes - continuously replicate data from primary using cloning strategy

If the primary node becomes unavailable, MongoDB automatically elects a new primary from the secondary nodes. This ensures the database remains available.

2. Distribute replica set nodes across multiple available zones

This ensures that:
* A zone outage does not take down the entire database
* A majority of nodes remain reachable
* Automatic failover can still occur

3. Enable automated backups and point-in-time recovery

This protects against:
* Accidental deletion
* Data corruption
* Catastrophic failures
