class AnswerGenerationService {
    async getAnswer(question: string) {
        const response = await fetch('http://localhost:3001/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: question,
            })
        });
        const res = await response.json();
        return res;
    }
}

export default new AnswerGenerationService();
