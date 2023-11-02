pipeline {
	agent any
	stages {
		stage('Backend Tests') {
		    steps{
                dir('backend-sit-forum-app-v1'){
                    sh 'npm install'
                    sh 'npm audit fix --force'
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
