pipeline {
	agent {
        docker {
            image 'node:latest'
            args '-p 8443:3000'
        }
    }

	tools {nodejs 'NodeJS'}
	environment {
        PORT = credentials('port')
        DB_URI = credentials('DB_URI')
        JWT_SECRET = credentials('JWT_SECRET')
        NODE_ENV = credentials('NODE_ENV')
        DANGEROUSLY_DISABLE_HOST_CHECK=credentials('DANGEROUSLY_DISABLE_HOST_CHECK')
        REACT_APP_API = credentials('REACT_APP_API')
    }

	stages {
		stage('Backend Tests') {
		    steps{
                dir('backend-sit-forum-app-v1'){
                    //sh 'npm install'
                    //sh 'npm audit fix --force'
                    //sh 'export PORT=$PORT'
                    //sh 'export DB_URI=$DB_URI'
                    //sh 'export JWT_SECRET=$JWT_SECRET'
                    //sh 'export NODE_ENV=$NODE_ENV'
                    //sh 'npm test'
                    //junit 'backend-test-results.xml'
                }
			}
		}
		stage('Install Frontend Dependencies'){
            steps{
                dir('frontend-sit-forum-app'){
                    sh 'npm install'
                }
            }
        }
        stage('Testing'){
            parallel{
                stage('Start Frontend'){
                    steps{
                        dir('frontend-sit-forum-app'){
                            sh 'npm start'
                        }
                    }
                }
                stage('Frontend Tests') {
                    steps {
                        dir('frontend-sit-forum-app'){
                            sh 'sleep 60'
                            sh 'npm test'
                            junit 'frontend-test-results.xml'
                        }
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
