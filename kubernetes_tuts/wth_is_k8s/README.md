## Kubernetes Basics
----
* Deploy a containerized application on a cluster.
* Scale the deployment.
* Update the containerized application with a new software version.
* Debug the containerized application.

## What can Kubernetes do for you?
----
* With modern web services, users expect applications to be available 24/7, and developers expect to deploy new versions of those applications several times a day.
* Containerization helps package software to serve these goals, enabling applications to be released and updated in an easy and fast way without downtime. 
* Kubernetes helps you make sure those containerized applications run where and when you want, and helps them find the resources and tools they need to work. 
* Kubernetes is a production-ready, open source platform designed with Google's  experience in container orchestration, combined with ideas from the community.

### Using Minikube to Create a Cluster
----

Objectives

    Learn what a Kubernetes cluster is.
    Learn what Minikube is.
    Start a Kubernetes cluster using an online terminal.

Kubernetes Clusters

Kubernetes coordinates a highly available cluster of computers that are connected to work as a single unit. The abstractions in Kubernetes allow you to deploy containerized applications to a cluster without tying them specifically to individual machines. To make use of this new model of deployment, applications need to be packaged in a way that decouples them from individual hosts: they need to be containerized. Containerized applications are more flexible and available than in past deployment models, where applications were installed directly onto specific machines as packages deeply integrated into the host. Kubernetes automates the distribution and scheduling of application containers across a cluster in a more efficient way. Kubernetes is an open-source platform and is production-ready.

A Kubernetes cluster consists of two types of resources:

    The Master coordinates the cluster
    Nodes are the workers that run applications

Summary:

    Kubernetes cluster
    Minikube

#### Cluster Diagrams
![](https://d33wubrfki0l68.cloudfront.net/99d9808dcbf2880a996ed50d308a186b5900cec9/40b94/docs/tutorials/kubernetes-basics/public/images/module_01_cluster.svg)

* The **Master** is responsible for managing the cluster. 
* The master coordinates all activities in your cluster, such as scheduling applications, maintaining applications' desired state, scaling applications, and rolling out new updates.

* A **node** is a VM or a physical computer that serves as a worker machine in a Kubernetes cluster. 
* Each node has a **Kubelet**, which is an agent for managing the node and communicating with the Kubernetes master. 
* The node should also have tools for handling container operations, such as **Docker** or **rkt**. A Kubernetes cluster that handles production traffic should have a minimum of three nodes.

Masters manage the cluster and the nodes are used to host the running applications.

* When you deploy applications on Kubernetes, you tell the master to start the application containers. 
* The master schedules the containers to run on the cluster's nodes. 
* The nodes communicate with the master using the Kubernetes API, which the master exposes. 
* End users can also use the Kubernetes API directly to interact with the cluster.

* A Kubernetes cluster can be deployed on either physical or virtual machines. 
* Minikube is a lightweight Kubernetes implementation that creates a VM on your local machine and deploys a simple cluster containing only one node.
* 
### Cluster up and running

We already installed minikube for you. Check that it is properly installed, by running the minikube version command:

`minikube version`

OK, we can see that minikube is in place.

Start the cluster, by running the minikube start command:

`minikube start`

### Checkout the Cluster Verions
----
`minikube --version`

### Cluster details

`kubectl cluster-info`

* A running master and a dashboard. The Kubernetes dashboard allows you to view your applications in a UI. 
* To view the nodes in the cluster, run the kubectl get nodes command:

`kubectl get nodes`

This command shows all nodes that can be used to host our applications.

## Using `kubectl  to Create Deployments
----
* Learn about application Deployments.
* Deploy your first app on Kubernetes with kubectl.

### Kubernetes Deployments
----
Once you have a running Kubernetes cluster, you can deploy your containerized applications on top of it. 

* The Deployment instructs Kubernetes how to create and update instances of your application. 
* Once you've created a Deployment, the Kubernetes master schedules mentioned application instances onto individual Nodes in the cluster.

* Once the application instances are created, a Kubernetes Deployment Controller continuously monitors those instances. 
* If the Node hosting an instance goes down or is deleted, the Deployment controller replaces the instance with an instance on another Node in the cluster. 
* This provides a self-healing mechanism to address machine failure or maintenance.

* In a past, installation scripts would often be used to start applications, but they did not allow recovery from machine failure. 
* By both creating your application instances and keeping them running across Nodes, Kubernetes Deployments provide a fundamentally different approach to application management.

* A Deployment is responsible for creating and updating instances of your application

### Deploying your first app on Kubernetes
----

![](https://d33wubrfki0l68.cloudfront.net/152c845f25df8e69dd24dd7b0836a289747e258a/4a1d2/docs/tutorials/kubernetes-basics/public/images/module_02_first_app.svg)

* You can create and manage a Deployment by using the Kubernetes command line interface, `Kubectl`. 
* Kubectl uses the Kubernetes API to interact with the cluster. 

* When you create a Deployment, you'll need to specify the container image for your application and the number of replicas that you want to run. 
* You can change that information later by updating your Deployment

* Applications need to be packaged into one of the supported container formats in order to be deployed on Kubernetes

### kubectl basics
----
* Type kubectl in the terminal to see its usage. The common format of a kubectl command is: `kubectl action resource`. 
* This performs the specified action (like create, describe) on the specified resource (like node, container). You can use `--help` after the command to get additional info about possible parameters `kubectl get nodes --help`

* To Check that `kubectl` is configured to talk to your cluster, by running the kubectl version command:

`kubectl version`

* You can see both the client and the server versions.

To view the nodes in the cluster, run the `kubectl get nodes` command:

`kubectl get nodes`

### Deploy the Applications
---

* The run command creates a new deployment.
* We need to provide the **deployment name** and **app image location** (include the full repository url for images hosted outside Docker hub). We want to run the app on a specific port so we add the `--port` :

`kubectl run kubernetes-bootcamp --image=gcr.io/google-samples/kubernetes-bootcamp:v1 --port=8080`

* searched for a suitable node where an instance of the application could be run (we have only 1 available node)
* scheduled the application to run on that Node
* configured the cluster to reschedule the instance on a new Node when needed

* To list your deployments use the get deployments command:

`kubectl get deployments`

### View our app
----
* Pods that are running inside Kubernetes are running on a private, isolated network. 
* By default they are visible from other pods and services within the same kubernetes cluster, but not outside that network. When we use kubectl, we're interacting through an API endpoint to communicate with our application.

* The `kubectl` command can create a proxy that will forward communications into the cluster-wide, private network. 
* The proxy can be terminated by pressing control-C and won't show any output while its running.

We will open a second terminal window to run the proxy.

```bash
echo -e "\n\n\n\e[92mStarting Proxy. After starting it will not output a response. Please click the first Terminal Tab\n"; 
kubectl proxy
```

* We now have a connection between our host (the online terminal) and the Kubernetes cluster. The proxy enables direct access to the API from these terminals.

* You can see all those APIs hosted through the proxy endpoint. For example, we can query the version directly through the API using the curl command:

`curl http://localhost:8001/version`

* If `Port 8001` is not accessible, ensure that the `kubectl proxy` started above is running.

* The API server will automatically create an endpoint for each pod, based on the pod name, that is also accessible through the proxy.

First we need to get the Pod name, and we'll store in the environment variable `POD_NAME`:
```bash
export POD_NAME=$(kubectl get pods -o go-template --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}')
echo Name of the Pod: $POD_NAME
```
Now we can make an HTTP request to the application running in that pod:

`curl http://localhost:8001/api/v1/namespaces/default/pods/$POD_NAME/proxy/`

The url is the route to the API of the Pod.

### Viewing Pods and Nods
----

### Kubernetes Pods

* When you created a Deployment, Kubernetes created a Pod to host your application instance. 
* A **Pod** is a Kubernetes abstraction that represents a group of one or more application containers (such as Docker or rkt), and some shared resources for those containers. 
* Those resources include:
* Shared storage, as Volumes
* Networking, as a unique cluster IP address
* Information about how to run each container, such as the container image version or specific ports to use

* Pod models an application-specific "logical host" and can contain different application containers which are relatively tightly coupled. 
  
* For example, a Pod might include both the container with your `Node.js` app as well as a different container that feeds the data to be published by the Node.js webserver. 
* The containers in a Pod share an IP Address and port space, are always co-located and co-scheduled, and run in a shared context on the same Node.

* Pods are the atomic unit on the Kubernetes platform. 
* When we create a Deployment on Kubernetes, that Deployment creates Pods with containers inside them (as opposed to creating containers directly). 
* Each Pod is tied to the Node where it is scheduled, and remains there until termination (according to restart policy) or deletion. In case of a Node failure, identical Pods are scheduled on other available Nodes in the cluster.

#### Pods Overview
![](https://d33wubrfki0l68.cloudfront.net/fe03f68d8ede9815184852ca2a4fd30325e5d15a/98064/docs/tutorials/kubernetes-basics/public/images/module_03_pods.svg)

#### Nodes

* A Pod always runs on a **Node**. 
* A Node is a worker machine in Kubernetes and may be either a virtual or a physical machine, depending on the cluster. 
* Each Node is managed by the Master. 
* A Node can have multiple pods, and the Kubernetes master automatically handles scheduling the pods across the Nodes in the cluster. 
* The Master's automatic scheduling takes into account the available resources on each Node.

##### Every Kubernetes Node runs at least:

* Kubelet, a process responsible for communication between the Kubernetes Master and the Node; it manages the Pods and the containers running on a machine.
* A container runtime (like Docker, rkt) responsible for pulling the container image from a registry, unpacking the container, and running the application.

* Containers should only be scheduled together in a single Pod if they are tightly coupled and need to share resources such as disk.

#### Node overview
----
![](https://d33wubrfki0l68.cloudfront.net/5cb72d407cbe2755e581b6de757e0d81760d5b86/a9df9/docs/tutorials/kubernetes-basics/public/images/module_03_nodes.svg)

### Troubleshooting with kubectl
----
Most common operations can be done with the following kubectl commands:

* `kubectl get` - list resources
* `kubectl describe` - show detailed information about a resource
* `kubectl logs` - print the logs from a container in a pod
* `kubectl exec` - execute a command on a container in a pod

You can use these commands to see when applications were deployed, what their current statuses are, where they are running and what their configurations are.

### Explore the App
-----
##### Step 1 Check application configuration

Verify that the application we deployed in the previous scenario is running. Use the `kubectl get` command and look for existing Pods:

`kubectl get pods`

* To view what containers are inside that Pod and what images are used to build those containers we run the describe pods command:

`kubectl describe pods`

* Shows about the Pod’s container: IP address, the ports used and a list of events related to the lifecycle of the Pod.

* **Note:** the describe command can be used to get detailed information about most of the kubernetes primitives: node, pods, deployments. 
* The describe output is designed to be human readable, not to be scripted against.

##### Step 2 Show the app in the terminal
-----

* Pods are running in an isolated, private network - so we need to proxy access to them so we can debug and interact with them. 
* To do this, use the `kubectl proxy` command to run a proxy in a second terminal window. 

`echo -e "\n\n\n\e[92mStarting Proxy. After starting it will not output a response. Please click the first Terminal Tab\n"; kubectl proxy`

* We get the Pod name and query that pod directly through the proxy. 
* To get the Pod name and store it in the POD_NAME environment variable:

```bash
export POD_NAME=$(kubectl get pods -o go-template --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}')
echo Name of the Pod: $POD_NAME
```

* To see the output of our application, run a curl request.

`curl http://localhost:8001/api/v1/namespaces/default/pods/$POD_NAME/proxy/`


The url is the route to the API of the Pod.

### Step 3 View the container logs
----
Anything that the application would normally send to STDOUT becomes logs for the container within the Pod. 

`kubectl logs $POD_NAME`

##### Step 4 Executing command on the container
----

* Execute commands directly on the container once the Pod is up and running. 
* For this, we use the `exec` command and use the name of the Pod as a parameter. List the environment variables:

`kubectl exec $POD_NAME env`

* The container itself can be omitted since we only have a single container in the Pod.

* Start a bash session in the Pod’s container:

`kubectl exec -ti $POD_NAME bash`

* We have now an open console on the container where we run our NodeJS application. 
  
* The source code of the app is in the server.js file:

`cat server.js`

* You can check that the application is up by running a curl command:

`curl localhost:8080`

**Note:** here we used localhost because we executed the command inside the NodeJS container

## Using Service to Expose The App
-----
* Learn about a Service in Kubernetes
* Understand how labels and LabelSelector objects relate to a Service
* Expose an application outside a Kubernetes cluster using a Service

### Overview of Kubernetes Services
----

* Kubernetes Pods are mortal. Pods in fact have a lifecycle. When a worker node dies, the Pods running on the Node are also lost. 
* A `ReplicaSet` might then dynamically drive the cluster back to desired state via creation of new Pods to keep your application running. 
* As another example, consider an image-processing backend with 3 replicas. Those replicas are exchangeable; the front-end system should not care about backend replicas or even if a Pod is lost and recreated. 
* That said, each Pod in a Kubernetes cluster has a unique IP address, even Pods on the same Node, so there needs to be a way of automatically checking changes among Pods so that your applications continues.

* A **Service** in Kubernetes is an abstraction which defines a logical set of Pods and a policy by which to access them. 
* Services enable a loose coupling between dependent Pods. 
* A Service is defined using **YAML** (preferred) or **JSON**, like all Kubernetes objects. 
* The set of Pods targeted by a Service is usually determined by a `LabelSelector` 
* Although each Pod has a unique IP address, those IPs are not exposed outside the cluster without a Service. 
* Services allow your applications to receive traffic. 
* Services can be exposed in different ways by specifying a type in the `ServiceSpec`:

* `ClusterIP (default)` - Exposes the Service on an internal IP in the cluster. This type makes the Service only reachable from within the cluster.
* `NodePort` - Exposes the Service on the same port of each selected Node in the cluster using NAT. Makes a Service accessible from outside the cluster using `<NodeIP>:<NodePort>`. Superset of ClusterIP.
* `LoadBalancer` - Creates an external load balancer in the current cloud (if supported) and assigns a fixed, external IP to the Service. Superset of NodePort.
* `ExternalName` - Exposes the Service using an arbitrary name (specified by externalName in the spec) by returning a CNAME record with the name. No proxy is used. 
 
* Some use cases with Services that involve not defining selector in the spec. 
* A Service created without selector will also not create the corresponding Endpoints object. 
* This allows users to manually map a Service to specific endpoints. Another possibility why there may be no selector is you are strictly using type: `ExternalName`.

##### Services and Labels
----
![](https://d33wubrfki0l68.cloudfront.net/cc38b0f3c0fd94e66495e3a4198f2096cdecd3d5/ace10/docs/tutorials/kubernetes-basics/public/images/module_04_services.svg)


A Service routes traffic across a set of Pods. Services are the abstraction that allow pods to die and replicate in Kubernetes without impacting your application. Discovery and routing among dependent Pods (such as the frontend and backend components in an application) is handled by Kubernetes Services.

Services match a set of Pods using labels and selectors, a grouping primitive that allows logical operation on objects in Kubernetes. Labels are key/value pairs attached to objects and can be used in any number of ways:

* Designate objects for development, test, and production
*  Embed version tags
* Classify an object using tags

You can create a Service at the same time you create a Deployment by using
`--expose` in `kubectl`.


![https://d33wubrfki0l68.cloudfront.net/b964c59cdc1979dd4e1904c25f43745564ef6bee/f3351/docs/tutorials/kubernetes-basics/public/images/module_04_labels.svg](Services and Labels)


Labels can be attached to objects at creation time or later on. They can be modified at any time.


## Expose your App to Public Internet
----
#### Step 1 Create a new service
----
Let’s verify that our application is running -> use the `kubectl get command` and look for existing Pods:

`kubectl get pods`

List the current Services from our cluster:

`kubectl get services`

* We have a Service called **kubernetes** that is created by default when `minikube start`s the cluster. 
* To create a new service and expose it to external traffic use the `expose` command with `NodePort` as parameter (**minikube does not support the LoadBalancer option yet**).

`kubectl expose deployment/kubernetes-bootcamp --type="NodePort" --port 8080`

Let’s run again the get services command:

`kubectl get services`

* There is a running Service called **kubernetes-bootcamp**. Here we see that the
* The Service received a unique cluster-IP, an internal port and an external-IP (the IP of the Node).

To find out what port was opened externally (by the NodePort option) we’ll run the describe service command:

`kubectl describe services/kubernetes-bootcamp`

* Create an environment variable called `NODE_PORT` that has the value of the Node port assigned:

```bash
export NODE_PORT=$(kubectl get services/kubernetes-bootcamp -o go-template='{{(index .spec.ports 0).nodePort}}')
echo NODE_PORT=$NODE_PORT
```

* Now we can test that the app is exposed outside of the cluster using `curl`, the IP of the Node and the externally exposed port:

`curl $(minikube ip):$NODE_PORT`

And we get a response from the server. The Service is exposed

#### Step 2: Using labels
----
The Deployment created a label for our Pod. With `describe deployment` command you can see the name of the label:

`kubectl describe deployment`

* Use the label to query our list of Pods. 
* The `kubectl get pods` command with `-l` as a parameter, followed by the label values:

`kubectl get pods -l run=kubernetes-bootcamp`

* Do the same to list the existing services:

`kubectl get services -l run=kubernetes-bootcamp`

Get the name of the Pod and store it in the POD_NAME environment variable:

```bash
export POD_NAME=$(kubectl get pods -o go-template --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}')
echo Name of the Pod: $POD_NAME
```
To apply a new label we use the label command followed by the object type, object name and the new label:

`kubectl label pod $POD_NAME app=v1`

This will apply a new label to our Pod (we pinned the application version to the Pod), and we can check it with the describe pod command:

`kubectl describe pods $POD_NAME`

We see here that the label is attached now to our Pod. And we can query now the list of pods using the new label:

`kubectl get pods -l app=v1`

And we see the Pod.

#### Step 3 Deleting a service
----
To delete Services you can use the delete service command. Labels can be used also here:

`kubectl delete service -l run=kubernetes-bootcamp`

* Confirm that the service is gone:

`kubectl get services`

* This confirms that our Service was removed. 
* To confirm that route is not exposed anymore you can curl the previously exposed IP and port:

`curl $(minikube ip):$NODE_PORT`

* This proves that the app is not reachable anymore from outside of the cluster. 
* You can confirm that the app is still running with a curl inside the pod:

`kubectl exec -ti $POD_NAME curl localhost:8080`

* The application is up. 
* This is because the Deployment is managing the application. 
* To shut down the application, you would need to delete the Deployment as well.

## Scaling out Your App to Run Multiple Instances
-----
* Scale this thing using `kubectl`

#### Scaling Overview
----
![](https://d33wubrfki0l68.cloudfront.net/043eb67914e9474e30a303553d5a4c6c7301f378/0d8f6/docs/tutorials/kubernetes-basics/public/images/module_05_scaling1.svg)

Deployment with Services
![](https://d33wubrfki0l68.cloudfront.net/30f75140a581110443397192d70a4cdb37df7bfc/b5f56/docs/tutorials/kubernetes-basics/public/images/module_05_scaling2.svg)

* Scaling out a Deployment will ensure new Pods are created and scheduled to Nodes with available resources. 
* Scaling will increase the number of Pods to the new desired state. 
* Kubernetes also supports autoscaling of Pods.
* Scaling to zero is also possible, and it will terminate all Pods of the specified Deployment.

* Running multiple instances of an application will require a way to distribute the traffic to all of them. 
* Services have an integrated load-balancer that will distribute network traffic to all Pods of an exposed Deployment. 
* Services will monitor continuously the running Pods using endpoints, to ensure the traffic is sent only to available Pods.

* Scaling is accomplished by changing the number of replicas in a Deployment.

Once you have multiple instances of an Application running, you would be able to do Rolling updates without downtime.

### Step 1: Scaling a deployment

* To list your deployments use the get deployments command: `kubectl get deployments`


* **READY** column shows the ratio of CURRENT to DESIRED replicas

* **CURRENT** is the number of replicas running now

* **DESIRED** is the configured number of replicas

* The **UP-TO-DATE** is the number of replicas that were updated to match the desired (configured) state

* The **AVAILABLE** state shows how many replicas are actually AVAILABLE to the users

* To scale the Deployment to 4 replicas the `kubectl scale command`, followed by the deployment type, name and desired number of instances:

`kubectl scale deployments/kubernetes-bootcamp --replicas=4`

To list your Deployments once again, use get deployments:

`kubectl get deployments`

The change was applied, and we have 4 instances of the application available. Next, let’s check if the number of Pods changed:

`kubectl get pods -o wide`

There are 4 Pods now, with different IP addresses. The change was registered in the Deployment events log. To check that, use the describe command:

`kubectl describe deployments/kubernetes-bootcamp`

You can also view in the output of this command that there are 4 replicas now.

### Step 2: Load Balancing
----
* Check that the Service is load-balancing the traffic. 
* To find out the exposed IP and Port we can use the describe service:

`kubectl describe services/kubernetes-bootcamp`

Create an environment variable called `NODE_PORT` that has a value as the Node port:
```bash
export NODE_PORT=$(kubectl get services/kubernetes-bootcamp -o go-template='{{(index .spec.ports 0).nodePort}}')
echo NODE_PORT=$NODE_PORT
```
* `curl` to the exposed IP and port. Execute the command multiple times:

`curl $(minikube ip):$NODE_PORT`

We hit a different Pod with every request. This demonstrates that the load-balancing is working.

### Step 3: Scale Down
----

To scale down the Service to 2 replicas, run again the scale command:

`kubectl scale deployments/kubernetes-bootcamp --replicas=2`

List the Deployments to check if the change was applied with the get deployments command:

`kubectl get deployments`

The number of replicas decreased to 2. List the number of Pods, with get pods:

`kubectl get pods -o wide`

This confirms that 2 Pods were terminated

## Legit Coolness: Rolling Updates
-----

* Users expect applications to be available all the time and developers are expected to deploy new versions of them several times a day. 
* In Kubernetes this is done with rolling updates. Rolling updates allow Deployments' update to take place with zero downtime by incrementally updating Pods instances with new ones. The new Pods will be scheduled on Nodes with available resources.

* Scaled our application to run multiple instances. This is a requirement for performing updates without affecting application availability. 
* By default, the maximum number of Pods that can be unavailable during the update and the maximum number of new Pods that can be created, is one. Both options can be configured to either numbers or percentages (of Pods). 
* In Kubernetes, updates are versioned and any Deployment update can be reverted to previous (stable) version.

Rolling updates allow Deployments' update to take place with zero downtime by incrementally updating Pods instances with new ones.

##### Rolling updates overview
----
![](https://d33wubrfki0l68.cloudfront.net/30f75140a581110443397192d70a4cdb37df7bfc/fa906/docs/tutorials/kubernetes-basics/public/images/module_06_rollingupdates1.svg)

![](https://d33wubrfki0l68.cloudfront.net/678bcc3281bfcc588e87c73ffdc73c7a8380aca9/703a2/docs/tutorials/kubernetes-basics/public/images/module_06_rollingupdates2.svg)

![](https://d33wubrfki0l68.cloudfront.net/6d8bc1ebb4dc67051242bc828d3ae849dbeedb93/fbfa8/docs/tutorials/kubernetes-basics/public/images/module_06_rollingupdates4.svg)

* Similar to application Scaling, if a Deployment is exposed publicly, the Service will load-balance the traffic only to available Pods during the update. 
* An available Pod is an instance that is available to the users of the application.

##### Rolling updates allow the following actions:

* Promote an application from one environment to another (via container image updates)
* Rollback to previous versions
* Continuous Integration and Continuous Delivery of applications with zero downtime

If a Deployment is exposed publicly, the Service will load-balance the traffic only to available Pods during the update.

### Step 1: Update the version of the app
----
* To list your deployments use the get deployments command: kubectl get deployments

* To list the running Pods use the get pods command:

`kubectl get pods`

* To view the current image version of the app, run a describe command against the Pods (look at the Image field):

`kubectl describe pods`

* To update the image of the application to version 2, use the set image command, followed by the deployment name and the new image version:

`kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=jocatalin/kubernetes-bootcamp:v2`

* The command notified the Deployment to use a different image for your app and initiated a rolling update. Check the status of the new Pods, and view the old one terminating with the get pods command:

`kubectl get pods`

### Step 2: Verify an update
----
* Check that the App is running. To find out the exposed IP and Port we can use describe service:

`kubectl describe services/kubernetes-bootcamp`

Create an environment variable called `NODE_PORT` that has the value of the Node port assigned:
```bash
export NODE_PORT=$(kubectl get services/kubernetes-bootcamp -o go-template='{{(index .spec.ports 0).nodePort}}')
echo NODE_PORT=$NODE_PORT
```
* Do a `curl` to the the exposed IP and port:

`curl $(minikube ip):$NODE_PORT`

We hit a different Pod with every request and we see that all Pods are running the latest version (v2).

* The update can be confirmed also by running a rollout status command:

`kubectl rollout status deployments/kubernetes-bootcamp`

* To view the current image version of the app, run a describe command against the Pods:

`kubectl describe pods`

We run now version 2 of the app (look at the Image field)

### Step 3 Rollback an update

* Perform another update, and deploy image tagged as `v10` :

`kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=gcr.io/google-samples/kubernetes-bootcamp:v10`

* Use get deployments to see the status of the deployment:

`kubectl get deployments`

* **And something is wrong…** We do not have the desired number of Pods available. List the Pods again:

`kubectl get pods`

A describe command on the Pods should give more insights:

`kubectl describe pods`

There is no image called v10 in the repository. 

* Let’s roll back to our previously working version. We’ll use the `rollout undo` command:

`kubectl rollout undo deployments/kubernetes-bootcamp`

* The rollout command reverted the deployment to the previous known state (v2 of the image). 
* Updates are versioned and you can revert to any previously know state of a Deployment. List again the Pods:

`kubectl get pods`

* Four Pods are running. Check again the image deployed on the them:

`kubectl describe pods`

We see that the deployment is using a stable version of the app (v2). The Rollback was successful.
