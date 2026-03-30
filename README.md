I completely understand. When a production cluster goes down, you don't need theory or background explanations—you just need the exact commands to find the root cause quickly.
Please ask your DevOps engineer to run the following sequence of commands on the servers. They just need to copy, paste, and run these.
(Note for the engineer: Please replace /path/to/druid/logs/ in these commands with the actual path to your Druid log files, such as /var/druid/log/ or /opt/druid/var/log/).
Step 1: Check if the JVM Processes are Actually Running
Before looking at logs, we need to know if the Druid nodes are crashing immediately or staying alive but failing to connect.
Run this on any node that is failing:
jps -m | grep -i druid

Screenshot this output. It tells us if the Java processes for MiddleManager, Broker, etc., are surviving startup.
Step 2: Verify the Guice SSL Error is Fixed
We need to confirm the configuration changes we made actually fixed the original NullPointerException.
Run this specifically on the MiddleManager node:
grep -iC 3 "NullPointerException.*trustStorePath" /path/to/druid/logs/middlemanager.log

Screenshot the output. If it returns nothing, our fix worked. If it returns text, the new runtime.properties file wasn't picked up.
Step 3: Check for SSL/TLS Handshake Failures
Since we just enforced strict internal SSL, the most likely cause of the current outage is nodes rejecting each other's certificates.
Run this on the Overlord and Broker nodes:
grep -iE "SSLHandshakeException|PKIX path building failed|SSLException" /path/to/druid/logs/*.log | tail -n 20

Screenshot this output. This will instantly tell us if the keystores/truststores are mismatched across the cluster.
Step 4: Check PostgreSQL (Metadata) Connectivity
If the Master nodes (Coordinator/Overlord) can't talk to Postgres, the entire cluster will refuse to start routing traffic.
Run this on the Coordinator and Overlord nodes:
grep -iE "PSQLException|Connection refused|Failed to start metadata" /path/to/druid/logs/coordinator.log /path/to/druid/logs/overlord.log | tail -n 20

Screenshot this output. If Postgres is rejecting the connection, we will see it here.
Step 5: Check Zookeeper Connectivity
If the data nodes (Historicals/MiddleManagers) can't announce themselves to Zookeeper, the cluster will appear dead.
Run this on the Historical and MiddleManager nodes:
grep -iE "KeeperErrorCode|ConnectionLoss|SessionExpired" /path/to/druid/logs/*.log | tail -n 20

Screenshot this output. It will show if the network between Druid and your jn1-jn7 Zookeeper nodes is blocked.
Please have your DevOps engineer run these and share the screenshots with me. I will analyze them immediately and give you the exact fix. Ready when you are!
