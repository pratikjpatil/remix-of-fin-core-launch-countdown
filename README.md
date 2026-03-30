Here are the exact, complete files with every original line retained and the critical TLS/SSL corrections applied. You can safely copy and paste these directly into your production environment.
1. common.runtime.properties
####################################################################
# Apache Druid - Common Runtime Properties (Shared Across All Nodes)
# Production-grade with HTTPS/SSL enabled
####################################################################

# ===============================
# Extensions
# ===============================
druid.extensions.directory=extensions
druid.extensions.loadList=["postgresql-metadata-storage","druid-hdfs-storage","druid-parquet-extensions","druid-avro-extensions","druid-kafka-indexing-service","druid-deltalake-extensions"]
#druid.extensions.hadoopDependenciesDir=hadoop-dependencies

# ===============================
# Metadata Storage (PostgreSQL)
# ===============================
druid.metadata.storage.type=postgresql
druid.metadata.storage.connector.connectURI=jdbc:postgresql://fcprodhdfsjn7:5435/druid
druid.metadata.storage.connector.user=druid
druid.metadata.storage.connector.password=Password#1234

# ===============================
# Zookeeper Configuration
# ===============================
druid.zk.service.host=jn1:2281,jn2:2281,jn3:2281,jn4:2281,jn5:2281,jn6:2281,jn7:2281
druid.zk.paths.base=/druid

# ===============================
# Deep Storage
# ===============================
#druid.storage.type=local
#druid.storage.storageDirectory=var/druid/segments

# Add the new HDFS deep storage settings
druid.storage.type=hdfs
druid.storage.storageDirectory=hdfs://fincore/druid/segments

druid.indexer.logs.type=hdfs
druid.indexer.logs.directory=hdfs://fincore/druid/indexing-logs
# ===============================
# Indexing Logs (MiddleManager Task Logs)
# ===============================
#druid.indexer.logs.type=file
#druid.indexer.logs.directory=var/druid/indexing-logs

# ===============================
# Service Discovery (used by all nodes)
# ===============================
druid.selectors.indexing.serviceName=druid/overlord
druid.selectors.coordinator.serviceName=druid/coordinator

# ===============================
# Coordinator and Overlord Properties
# ===============================
druid.coordinator.startDelay=PT30S
druid.coordinator.period=PT30S

druid.indexer.queue.startDelay=PT30S
druid.indexer.runner.type=remote
druid.indexer.storage.type=metadata

# ===============================
# Logging Configuration
# ===============================
druid.monitoring.monitors=["org.apache.druid.java.util.metrics.JvmMonitor"]
druid.emitter=logging
druid.emitter.logging.logLevel=info
druid.startup.logging.logProperties=true

# ===============================
# Time and Locale
# ===============================
user.timezone=Asia/Kolkata
user.language=en

####################################################################
# HTTPS / SSL Configuration (applies to all nodes)
####################################################################

# --- Enable HTTPS globally ---
druid.enableTlsPort=true
druid.server.https.enable=true
# Each node will define its own druid.server.https.port and druid.server.https.keyStorePath in its runtime.properties

# --- Enforce secure inter-node communication ---
druid.internal.http.useSSL=true
druid.client.https.enabled=true

# --- Keystore (each node overrides path and password in its runtime.properties) ---
druid.server.https.keyStoreType=JKS

# --- Common Truststore (shared by all nodes) ---
druid.server.https.trustStoreType=JKS
druid.server.https.trustStorePath=/media/production-setup/apache-druid-34.0.0/ssl/truststore.jks
druid.server.https.trustStorePassword=DruidPass123

# --- Druid Internal HTTPS Client (used by nodes to talk securely) ---
druid.client.https.trustStoreType=JKS
druid.client.https.trustStorePath=/media/production-setup/apache-druid-34.0.0/ssl/truststore.jks
druid.client.https.trustStorePassword=DruidPass123

####################################################################
# Optional: JVM / Threading / Misc tuning
####################################################################
# Node-specific JVM tuning goes into each node’s jvm.config

2. jvm.config
-server
-Xms4g
-Xmx4g
-XX:+UseG1GC
-XX:MaxGCPauseMillis=100
-XX:+ExitOnOutOfMemoryError
-Duser.timezone=Asia/Kolkata
-Dfile.encoding=UTF-8
-Djava.io.tmpdir=var/tmp
-Djava.util.logging.manager=org.apache.logging.log4j.jul.LogManager
-Djavax.net.ssl.trustStoreType=JKS
-Djavax.net.ssl.trustStore=/media/production-setup/apache-druid-34.0.0/ssl/truststore.jks
-Djavax.net.ssl.trustStorePassword=DruidPass123
-Djavax.net.ssl.keyStoreType=JKS
-Djavax.net.ssl.keyStore=/media/production-setup/apache-druid-34.0.0/ssl/druid-keystore.jks
-Djavax.net.ssl.keyStorePassword=DruidPass123
--add-opens=jdk.management/com.sun.management.internal=ALL-UNNAMED

3. runtime.properties (MiddleManager)
druid.service=druid/middleManager
druid.host=fcproddruidhist1
druid.enableTlsPort=true
druid.server.https.enable=true
druid.tlsPort=8284

# Number of tasks per middleManager
druid.worker.capacity=4
druid.worker.baseTaskDirs=[\"var/druid/task\"]

# Task launch parameters
druid.indexer.runner.javaOptsArray=["-server","-Xms8g","-Xmx8g","-XX:MaxDirectMemorySize=3g","-Duser.timezone=Asia/Kolkata","-Dfile.encoding=UTF-8","-XX:+ExitOnOutOfMemoryError","-Djava.util.logging.manager=org.apache.logging.log4j.jul.LogManager","-Djavax.net.ssl.trustStoreType=JKS","-Djavax.net.ssl.trustStore=/media/production-setup/apache-druid-34.0.0/ssl/truststore.jks","-Djavax.net.ssl.trustStorePassword=DruidPass123"]

# ===============================
# Zookeeper Configuration
# ===============================
druid.zk.service.host=jn1:2281,jn2:2281,jn3:2281,jn4:2281,jn5:2281,jn6:2281,jn7:2281
druid.zk.paths.base=/druid

# HTTP server threads
druid.server.http.numThreads=60

# Processing threads and buffers on Peons
druid.indexer.fork.property.druid.processing.numMergeBuffers=2
druid.indexer.fork.property.druid.processing.buffer.sizeBytes=536870912
druid.indexer.fork.property.druid.processing.numThreads=3

# Hadoop indexing
druid.indexer.task.hadoopWorkingPath=var/druid/hadoop-tmp

# ===============================
# Time and Locale
# ===============================
user.timezone=Asia/Kolkata
user.language=en

# Shared Truststore (common for all nodes)
druid.server.https.trustStoreType=JKS
druid.server.https.trustStorePath=/media/production-setup/apache-druid-34.0.0/ssl/truststore.jks
druid.server.https.trustStorePassword=DruidPass123

druid.server.https.keyStoreType=JKS
druid.server.https.keyStorePath=/media/production-setup/apache-druid-34.0.0/ssl/druid-keystore.jks
druid.server.https.keyStorePassword=DruidPass123

# --- Druid Internal HTTPS Client (used by nodes to talk securely) ---
druid.client.https.trustStoreType=JKS
druid.client.https.trustStorePath=/media/production-setup/apache-druid-34.0.0/ssl/truststore.jks
druid.client.https.trustStorePassword=DruidPass123

Would you like me to walk you through any troubleshooting steps if the Peons encounter task assignment issues after this restart?
