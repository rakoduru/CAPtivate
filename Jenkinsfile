node{
  
    stage("Git Clone")
    {
		git credentialsId: 'GIT_CREDENTIALS', url:  'https://github.com/airavata-courses/CAPtivate.git',branch: 'test/jenkins-setup'
    }
    stage('Building Docker Image')
    {
		//echo %GIT_COMMIT%
        //COMMIT_ID = sh(returnStdout: true, script: 'git rev-parse HEAD')
	    echo ${env.GIT_BRANCH}
    
		// dir ('./UserManagement') {
			//sh 'docker build -t adiselv/captivate.user-management .'
			//sh 'docker tag adiselv/captivate.user-management adiselv/captivate.user-management:${GIT_COMMIT}'

		//}
		/*dir ('./WeatherApp') {
			sh 'docker build -t adiselv/captivate.ui .'
			sh 'docker tag adiselv/captivate.ui adiselv/captivate.ui:%GIT_COMMIT%'
		}
		dir ('./api-gateway') {
			sh 'docker build -t adiselv/captivate.api-gateway .'
			sh 'docker tag adiselv/captivate.api-gateway adiselv/captivate.api-gateway:%GIT_COMMIT%'
		}
		dir ('./data-retrieval') {
			sh 'docker build -t adiselv/captivate.data-retrieval .'
			sh 'docker tag adiselv/captivate.data-retrieval adiselv/captivate.data-retrieval:%GIT_COMMIT%'
		}
		dir ('./model-execution') {
			sh 'docker build -t adiselv/captivate.model-execution .'
			sh 'docker tag adiselv/captivate.model-execution adiselv/captivate.model-execution:%GIT_COMMIT%'
		}		
		dir ('./postprocessing-analysis') {
			sh 'docker build -t adiselv/captivate.post-process .'
			sh 'docker tag adiselv/captivate.post-process adiselv/captivate.post-process:%GIT_COMMIT%'
		}
		dir ('./session-management') {
			sh 'docker build -t adiselv/captivate.session-management .'
			sh 'docker tag adiselv/captivate.session-management adiselv/captivate.session-management:%GIT_COMMIT%'
		}	*/	
    }
    stage('Pushing to Docker hub') 
    {
        withCredentials([string(credentialsId: 'DOCKER_HUB_CREDENTIALS', variable: 'DOCKER_HUB_CREDENTIALS')]) {
            sh "docker login docker.io -u adiselv -p ${DOCKER_HUB_CREDENTIALS}"   
        }
        dir ('./UserManagement') {
			sh 'docker push adiselv/captivate.user-management:'${GIT_COMMIT}
			sh 'docker tag adiselv/captivate.user-management adiselv/captivate.user-management:latest'
			sh 'docker push adiselv/captivate.user-management:latest'
		}
		/*dir ('./WeatherApp') {
			sh 'docker push adiselv/captivate.ui:%GIT_COMMIT%'
			sh 'docker tag adiselv/captivate.ui adiselv/captivate.ui:latest'
			sh 'docker push adiselv/captivate.ui:latest'
		}
		dir ('./api-gateway') {
			sh 'docker push adiselv/captivate.api-gateway:%GIT_COMMIT%'
			sh 'docker tag adiselv/captivate.api-gateway adiselv/captivate.api-gateway:latest'
			sh 'docker push adiselv/captivate.api-gateway:latest'
		}
		dir ('./data-retrieval') {
			sh 'docker push adiselv/captivate.data-retrieval'
			sh 'docker push adiselv/captivate.user-management:%GIT_COMMIT%'
			sh 'docker tag session-management-microservice adiselv/captivate.user-management:latest'
			sh 'docker push adiselv/captivate.user-management:latest'
		}
		dir ('./model-execution') {
			sh 'docker push adiselv/captivate.model-execution:%GIT_COMMIT%'
			sh 'docker tag adiselv/captivate.model-execution adiselv/captivate.model-execution:latest'
			sh 'docker push adiselv/captivate.model-execution:latest'
		}		
		dir ('./postprocessing-analysis') {
			sh 'docker push adiselv/captivate.post-process:%GIT_COMMIT%'
			sh 'docker tag adiselv/captivate.post-process adiselv/captivate.post-process:latest'
			sh 'docker push adiselv/captivate.post-process:latest'
		}
		dir ('./session-management') {
			sh 'docker push adiselv/captivate.session-management:%GIT_COMMIT%'
			sh 'docker tag adiselv/captivate.session-management adiselv/captivate.session-management:latest'
			sh 'docker push adiselv/captivate.session-management:latest'
		}   */
            
    }    
    
    /*stage('Deploy app in K8s')
    {
        kubernetesDeploy(
            configs: 'deployments/zookeeper.yaml', 
            kubeconfigId: 'KUBERNETES_CLUSTER_CONFIG',
            enableConfigSubstitution: true
        )
        kubernetesDeploy(
            configs: 'deployments/kafka.yaml', 
            kubeconfigId: 'KUBERNETES_CLUSTER_CONFIG',
            enableConfigSubstitution: true
        )
		kubernetesDeploy(
            configs: 'deployments/api-gateway.yaml', 
            kubeconfigId: 'KUBERNETES_CLUSTER_CONFIG',
            enableConfigSubstitution: true
        )
		kubernetesDeploy(
            configs: 'deployments/user-management.yaml', 
            kubeconfigId: 'KUBERNETES_CLUSTER_CONFIG',
            enableConfigSubstitution: true
        )
		kubernetesDeploy(
            configs: 'deployments/session-management.yaml', 
            kubeconfigId: 'KUBERNETES_CLUSTER_CONFIG',
            enableConfigSubstitution: true
        )
        kubernetesDeploy(
            configs: 'deployments/data-retrieval.yaml', 
            kubeconfigId: 'KUBERNETES_CLUSTER_CONFIG',
            enableConfigSubstitution: true
        )
        kubernetesDeploy(
            configs: 'deployments/post-process.yaml', 
            kubeconfigId: 'KUBERNETES_CLUSTER_CONFIG',
            enableConfigSubstitution: true
        )
        kubernetesDeploy(
            configs: 'deployments/model-execution.yaml', 
            kubeconfigId: 'KUBERNETES_CLUSTER_CONFIG',
            enableConfigSubstitution: true
        )
        kubernetesDeploy(
            configs: 'deployments/ui-dep.yaml', 
            kubeconfigId: 'KUBERNETES_CLUSTER_CONFIG',
            enableConfigSubstitution: true
        )
		kubernetesDeploy(
            configs: 'deployments/ui.yaml', 
            kubeconfigId: 'KUBERNETES_CLUSTER_CONFIG',
            enableConfigSubstitution: true
        )
    }*/
}
