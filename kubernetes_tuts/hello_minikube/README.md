## What are we Going to do:
----
* Deploy a hello world app to `minikube`:
	* we need to install kubernetes
	* we need to install minikube
		* since we are running minikube on the VM we need to use the flag 
		* `minikube start --vm-driver=none`
		* `minikube dashboard`

* Run the Application we make
* View the Logs

-----

## The Files we need:
----
* `server.js` 

```javascript
var http = require('http');

var handleRequest = function(request, response) {
  console.log('Received request for URL: ' + request.url);
  response.writeHead(200);
  response.end('Hello World!');
};
var www = http.createServer(handleRequest);
www.listen(8080);
```

* Dockerfile
```text
FROM node:6.14.2
EXPOSE 8080
COPY server.js .
CMD node server.js
```


## Let's Get GO-ing:
-----
`minikube start --vm-driver=none`

 and then pop open the k8s dashboard

`minikube dashboard` 


## Create a Deployment
---
* A Kubernetes **Pod** is a group of one or more Containers, tied together for the purposes of administration and networking. 

* The Pod in this has only one Container. 
* A Kubernetes Deployment checks on the health of your Pod and restarts the Pod’s Container if it terminates. 
* Deployments are the recommended way to manage the creation and scaling of Pods.

* Use the`kubectl create`command to create a Deployment that manages a Pod. The Pod runs a Container based on the provided Docker image.

`kubectl create deployment hello-node --image=gcr.io/hello-minikube-zero-install/hello-node`

* View the Deployment:

    `kubectl get deployments`

* View the pop with:
	`kubectl get pods`
* View the events:
	`kubectl get events`
* View the `kubectl` configuration:
	`kubectl config view`

## Create a Service
----
* A pod is only accesible by its internal IP address within the cluster. I need to expose the ports outside the k8s network. 

* Exposing a Pod to Public Interwebs:
	`kubctl expose deployment hello-node --type=LoadBalancer --port-8080`

* Check out the service you made:
	`kubectl get services`

* **On Minikube, the `LoadBalancer` makes a service is accesible through the `minikube service` command**:
	
	`minikube service hello-node` 

## Add-Ons?
----
* List whichever addons we have already:
`minikube addons list`

* through in the addon **heapster**:
`minikube addons enable heapster`

* View the CLI work
`kubectl get pod, svc -n kube-system`

* disable an addon with the `disable` sub-command
`minikube addons disable heapster`

## Cleaning up:
-----
Clean up the resources we made for this demo: 

`kubectl delete service hello-node`


`kubectl delete deployment hello-node`

`minikube stop`

~or delete the vm~
