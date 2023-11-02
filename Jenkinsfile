pipeline {
	agent any
	stages{
	stage('OWASP Dependency-Check Vulnerabilities') {
                steps {
                    dependencyCheck additionalArguments: '--format HTML --format XML', odcInstallation: 'OWASP Dependency-Check Vulnerabilities'
                }
            }
            }
}
