import vertexai
from vertexai.language_models import TextGenerationModel

# import json 
# with open('Test.json' , 'r') as file :
#     jsonData = json.load(file)
# print(jsonData['data']['skills'] )

def predict_text(text_to_search):
# text_to_search = "can you help me with the commands?"
    vertexai.init(project="sdos-project-404807", location="us-central1")
    parameters = {
    "candidate_count": 1,
    "max_output_tokens": 1024,
    "temperature": 0.2,
    "top_p": 0.8,
    "top_k": 40
    }
    model = TextGenerationModel.from_pretrained("text-bison")
    response = model.predict(
    f"""My model is trained to classify text into six categories: Product, Development, Design, Marketing , Business, Management.Each category represents a track in the resume of a candidate that has applied. \'Development\' pertains to the Development track, the candidates with software engineering as their profeesion should be cateogrized into this . \'Product\' involves the strategic and operational activities associated with conceptualizing, developing, launching, and managing products to meet consumer needs and achieve business objectives. \'Design\' category focuses on creating visually appealing, functional, and user-centric solutions through a blend of creativity, strategic thinking, and user-centered methodologies. \'Marketing\' category revolves around understanding customer needs, communicating value propositions effectively, and leveraging various channels and strategies to influence consumer behavior, drive sales, and build lasting relationships with customers.. \'Business\' category encompasses the strategic and operational activities involved in managing resources, navigating market dynamics, complying with regulations, and fostering growth and sustainability for an organization. Lastly, \'Management\' category revolves around overseeing and optimizing the utilization of resources, fostering a productive and motivated workforce, navigating changes effectively, and steering the organization toward its strategic objectives through effective leadership and decision-making
Input: Feature prioritization based on user feedback
Output: Product

Input: A/B testing methodologies
Output: Product

Input: Product launch strategies
Output: Product

Input: User personas development
Output: Product

Input: Competitive analysis for product positioning
Output: Product

Input: Object-oriented programming
Output: Development

Input: API design and integration
Output: Development

Input: Continuous integration/continuous deployment (CI/CD)
Output: Development

Input: Software architecture design
Output: Development

Input: Familiarity with various frameworks and libraries
Output: Development

Input: User research and usability testing
Output: Design

Input: Motion graphics and animation
Output: Design

Input: Brand identity creation
Output: Design

Input: Responsive and adaptive design principles
Output: Design

Input: Design sprints facilitation
Output: Design

Input: Email marketing and automation
Output: Marketing

Input: Conversion rate optimization (CRO)
Output: Marketing

Input: Influencer marketing strategies
Output: Marketing

Input: Marketing campaign analysis
Output: Marketing

Input: Customer relationship management (CRM)
Output: Marketing

Input: SWOT analysis
Output: Business

Input: Strategic partnerships development
Output: Business

Input: Regulatory compliance understanding
Output: Business

Input: Business model canvas development
Output: Business

Input: Intellectual property management
Output: Business

Input: Performance evaluation and feedback
Output: Management

Input: Change management skills
Output: Management

Input: Resource allocation and management
Output: Management

Input: Negotiation and persuasion abilities
Output: Management

Input: Crisis management and risk assessment
Output: Management

Input: User experience journey mapping
Output: Product

Input: Design thinking workshops facilitation
Output: Product

Input: Behavioral analysis for feature optimization
Output: Product

Input: Microservices architecture design
Output: Development

Input: DevOps methodologies implementation
Output: Development

Input: Automated testing and continuous monitoring
Output: Development

Input: User interface animation and interaction design
Output: Design

Input: User research synthesis and insights presentation
Output: Design

Input: Collaborative design thinking across disciplines
Output: Design

Input: Personalization and segmentation strategies
Output: Marketing

Input: Growth hacking experimentation and implementation
Output: Marketing

Input: Emotional branding and storytelling techniques
Output: Marketing

Input: Scenario planning and risk mitigation strategies
Output: Business

Input: Market disruption analysis and response planning
Output: Business

Input: Sustainable business model innovation
Output: Business

Input: Agile leadership and adaptive decision-making
Output: Management

Input: Conflict resolution through mediation and negotiation
Output: Management

Input: Change readiness assessment and organizational alignment
Output: Management

input: {text_to_search}

output:
""",
    **parameters
    )
    return response.text

# print(predict_text(jsonData['data']['skills']))