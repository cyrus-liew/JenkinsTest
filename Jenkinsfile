pipeline {
	agent {
        docker {
            image 'node:18.18.2'
            args '-d -p 8443:3000 -u root -v /usr/lib/jvm/java-17-openjdk-amd64:/opt/host-java -e JAVA_HOME=/opt/host-java'
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
                sh 'echo $JAVA_HOME'
                sh 'wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -'
                sh 'sh -c "echo \'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main\' >> /etc/apt/sources.list.d/google-chrome.list"'
                sh 'apt-get update'
                sh 'apt-get install -y google-chrome-stable'

                // Download and install ChromeDriver (adjust version as needed)
                sh 'wget -N https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/119.0.6045.105/linux64/chromedriver-linux64.zip'
                sh 'unzip chromedriver-linux64.zip'
                sh 'cp ./chromedriver-linux64/chromedriver /usr/bin/chromedriver'
                sh 'chmod +x /usr/bin/chromedriver'

                sh 'apt-get install xvfb -y'
                sh 'apt-get install dbus -y'
                sh 'service dbus start'
            }
        }
        stage('Testing'){
            parallel{
                stage('Start Frontend'){
                    steps{
                        sh 'cd ./frontend-sit-forum-app && npm install'
                        sh 'cd ./frontend-sit-forum-app && npm start'
                        input message: 'Finished using the web site? (Click "Proceed" to continue)'
                    }
                }
                stage('Headless Browser Test') {
                    steps {
                        dir('frontend-sit-forum-app'){
                            sh 'sleep 120'
                            sh 'npm test'
                            junit 'frontend-test-results.xml'
                        }
                    }
                }
            }
        }
        stage('OWASP Dependency-Check Vulnerabilities') {
            steps {
                dependencyCheck additionalArguments: '--format HTML --format XML --log debug', odcInstallation: 'OWASP Dependency-Check Vulnerabilities'
            }
        }
	}
	post {
		success {
			dependencyCheckPublisher pattern: 'dependency-check-report.xml'
		}
	}
}
