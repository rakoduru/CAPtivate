#### Project Setup Instructions

Download or pull the repository in to your local machine. 

```sh
git clone https://github.com/airavata-courses/CAPtivate.git
```

### Run the application with Docker

#### Software Requirements

- [Docker/Docker Desktop](https://docs.docker.com/docker-for-windows/install/)

#### Steps
1. Go to the folder containing the code in the command prompt.
2. Run the application using the following command.
  ```sh
  docker-compose up -d
  ```

To check if images are cuilt in your local machine in Docker using the following command.
  ```
  docker image ls
  ```

### Run the application with Docker + Kubernetes on local machine

#### Software Requirements

- Docker/Docker Desktop(https://docs.docker.com/docker-for-windows/install/)
- [Kubernetes](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

#### Steps
1. Run Zookeeper and Kafka -
  Go to the ```deployments``` folder in your directory containing the code.
2. Run the following commands in a command prompt.
  ```sh
  kubectl apply -f zookeeper.yaml
  kubectl apply -f kafka.yaml
  kubectl apply -f api-gateway.yaml
  kubectl apply -f user-management.yaml
  kubectl apply -f session-management.yaml
  kubectl apply -f data-retrieval.yaml
  kubectl apply -f model-execution.yaml
  kubectl apply -f post-process.yaml
  kubectl apply -f ui.yaml
  ```

### Run the application on VM Kubernetes cluster

#### Requirements

- Kubernetes cluster set up on the VM machine 


#### Steps to set up VM Cluster
**[TO DO]**

#### Steps to run the application
1. Run the following commands in the kubectl prompt, in the given order.

  ```sh
  kubectl apply -f zookeeper.yaml
  kubectl apply -f kafka.yaml
  kubectl apply -f api-gateway.yaml
  kubectl apply -f user-management.yaml
  kubectl apply -f session-management.yaml
  kubectl apply -f data-retrieval.yaml
  kubectl apply -f model-execution.yaml
  kubectl apply -f post-process.yaml
  kubectl apply -f ui.yaml
  ```
