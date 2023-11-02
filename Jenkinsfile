pipeline {
	agent none

	//tools {nodejs 'NodeJS'}

	stages {
		//stage('Backend Tests') {
		    //steps{
                //dir('backend-sit-forum-app-v1'){
                    //sh 'npm install'
                    //sh 'npm audit fix --force'
                    //sh 'export PORT=$PORT'
                    //sh 'export DB_URI=$DB_URI'
                    //sh 'export JWT_SECRET=$JWT_SECRET'
                    //sh 'export NODE_ENV=$NODE_ENV'
                    //sh 'npm test'
                    //junit 'backend-test-results.xml'
                //}
			//}
		//}

        stage('Testing'){
            parallel{
                stage('Start Frontend'){
                    agent {
                        docker {
                            image 'node:18.18.2'
                            args '-d -p 8443:3000 -u root'
                        }
                    }
                    steps{
                        sh 'cd ./frontend-sit-forum-app && npm install'
                        sh 'cd ./frontend-sit-forum-app && npm start'
                    }
                }
                stage('Headless Browser Test') {
                    agent {
                        docker {
                            image 'maven:3-alpine'
                            args '-v /root/.m2:/root/.m2'
                        }
                    }
                    steps {
                        sh 'mvn -B -DskipTests clean package'
                        sh 'sleep 120'
                    	sh 'mvn test'
                    	junit './frontend-sit-forum-app/frontend-test-results.xml'
                        //sh 'sleep 120'
                        //sh 'cd ./frontend-sit-forum-app && npm test'
                        //junit './frontend-sit-forum-app/frontend-test-results.xml'
                    }
                }
            }
        }
        stage('OWASP Dependency-Check Vulnerabilities') {
            steps {
                dependencyCheck additionalArguments: '--format HTML --format XML', odcInstallation: 'OWASP Dependency-Check Vulnerabilities'
            }
        }
	}
	post {
		success {
			dependencyCheckPublisher pattern: 'dependency-check-report.xml'
		}
	}
}
