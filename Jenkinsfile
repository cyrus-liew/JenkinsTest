pipeline {
	agent any
	environment {
        PORT = credentials('port')
        DB_URI = credentials('DB_URI')
        JWT_SECRET = credentials('JWT_SECRET')
        NODE_ENV = credentials('NODE_ENV')
    }

	stages {
		stage('Backend Tests') {
		    steps{
                dir('backend-sit-forum-app-v1'){
                    sh 'npm install'
                    sh 'npm audit fix --force'
                    sh 'export PORT=$PORT'
                    sh 'export DB_URI=$DB_URI'
                    sh 'export JWT_SECRET=$JWT_SECRET'
                    sh 'export NODE_ENV=$NODE_ENV'
                    sh 'npm test'
                }
			}
		}
		stage('Publish Backend Test Results'){
		    steps{
		        //Publish xml to Jenkins
		        junit 'test-results.xml'
		    }
		}
		stage('OWASP Dependency-Check Vulnerabilities') {
			agent any
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
