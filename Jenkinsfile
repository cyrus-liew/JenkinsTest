pipeline {
	agent {
        docker {
            image 'node:18.18.2'
            args '-d -p 8443:3000 -u root'
        }
    }

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
        stage('Install Chrome for testing'){
            steps{
                 // Install Chrome and ChromeDriver (adjust versions as needed)
                sh 'apt-get update && apt-get install -y google-chrome-stable'
                sh 'apt-get install -y wget'
                sh 'wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -'
                sh 'sh -c "echo \'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main\' >> /etc/apt/sources.list.d/google-chrome.list"'
                sh 'apt-get update && apt-get install -y google-chrome-stable'
                sh 'apt-get install -y default-jre'

                // Download and install ChromeDriver (adjust version as needed)
                sh 'wget -N https://chromedriver.storage.googleapis.com/94.0.4606.61/chromedriver_linux64.zip'
                sh 'unzip chromedriver_linux64.zip -d /usr/bin/'
                sh 'chmod +x /usr/bin/chromedriver'
            }
        }
        stage('Testing'){
            parallel{
                stage('Start Frontend'){
                    steps{
                        sh 'cd ./frontend-sit-forum-app && npm install'
                        sh 'cd ./frontend-sit-forum-app && npm start'
                    }
                }
                stage('Headless Browser Test') {
                    steps {
                        sh 'sleep 120'
                        sh 'cd ./frontend-sit-forum-app && npm test'
                        junit './frontend-sit-forum-app/frontend-test-results.xml'
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
