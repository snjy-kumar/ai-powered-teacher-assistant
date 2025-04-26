// Types for our assignment data model
export type AssignmentResource = {
  title: string;
  type: 'pdf' | 'link' | 'video';
  url?: string;
};

export type RubricItem = {
  criterion: string;
  points: number;
  description: string;
};

export type Assignment = {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  progress: number;
  description: string;
  requirements: string[];
  rubric: RubricItem[];
  resources: AssignmentResource[];
  totalWords?: number;
};

// Mock database of assignments
const assignmentDatabase: Record<string, Assignment> = {
  '1': {
    id: '1',
    title: "Literary Analysis Essay",
    subject: "English Literature",
    dueDate: "2024-04-15",
    progress: 30,
    description: "Write a 1500-word analysis of the themes and symbolism in 'The Great Gatsby' by F. Scott Fitzgerald. Focus on how the author uses symbolism to convey the American Dream and its corruption.",
    requirements: [
      "Minimum 1500 words",
      "MLA format with proper citations",
      "At least 5 direct quotes from the text",
      "Analysis of at least 3 major symbols from the novel",
      "Discussion of how these symbols relate to the theme of the American Dream"
    ],
    rubric: [
      { criterion: "Thesis & Argument", points: 25, description: "Clear thesis statement and well-structured argument" },
      { criterion: "Textual Analysis", points: 30, description: "Thoughtful analysis of symbols and themes with relevant textual evidence" },
      { criterion: "Organization", points: 20, description: "Logical organization with clear transitions between ideas" },
      { criterion: "Writing Mechanics", points: 15, description: "Grammar, spelling, punctuation, and sentence structure" },
      { criterion: "Citations & Format", points: 10, description: "Proper MLA format and citations" }
    ],
    resources: [
      { title: "The Great Gatsby (Full Text)", type: "pdf", url: "/resources/gatsby.pdf" },
      { title: "Symbolism in The Great Gatsby - Guide", type: "pdf", url: "/resources/gatsby-symbolism.pdf" },
      { title: "MLA Citation Guide", type: "link", url: "https://owl.purdue.edu/owl/research_and_citation/mla_style/" }
    ],
    totalWords: 1500
  },
  '2': {
    id: '2',
    title: "Science Research Paper",
    subject: "Biology",
    dueDate: "2024-04-22",
    progress: 15,
    description: "Research and write a 2000-word paper on climate change's impact on marine ecosystems. Include data analysis and visual representations of your findings.",
    requirements: [
      "Minimum 2000 words",
      "At least 8 academic sources",
      "APA format with proper citations",
      "Include at least 3 data visualizations",
      "Propose potential solutions to address the problems identified"
    ],
    rubric: [
      { criterion: "Research Quality", points: 30, description: "Depth and quality of research, use of credible sources" },
      { criterion: "Data Analysis", points: 25, description: "Thorough analysis of data with clear interpretations" },
      { criterion: "Methodology", points: 20, description: "Clear explanation of research methods used" },
      { criterion: "Conclusions & Solutions", points: 15, description: "Logical conclusions and innovative solutions" },
      { criterion: "Citations & Format", points: 10, description: "Proper APA format and citations" }
    ],
    resources: [
      { title: "Climate Change and Oceans - Research Paper", type: "pdf", url: "/resources/climate-ocean.pdf" },
      { title: "Marine Biology Database Access", type: "link", url: "https://www.marinedata.edu" },
      { title: "APA Citation Guide", type: "link", url: "https://apastyle.apa.org/style-grammar-guidelines" }
    ],
    totalWords: 2000
  },
  '3': {
    id: '3',
    title: "History Research Project",
    subject: "World History",
    dueDate: "2024-05-01",
    progress: 50,
    description: "Research and analyze a significant historical event from the 20th century, focusing on its causes, outcomes, and long-term impact on global politics.",
    requirements: [
      "1800-2000 words",
      "Chicago style citations",
      "Primary source analysis",
      "Consideration of multiple historical perspectives",
      "Analysis of both short and long-term consequences"
    ],
    rubric: [
      { criterion: "Historical Analysis", points: 30, description: "Depth of historical analysis and interpretation" },
      { criterion: "Source Evaluation", points: 25, description: "Critical evaluation of primary and secondary sources" },
      { criterion: "Historical Context", points: 20, description: "Proper contextualization of the event" },
      { criterion: "Writing Quality", points: 15, description: "Clear organization, grammar, and style" },
      { criterion: "Citations & Format", points: 10, description: "Proper Chicago format and citations" }
    ],
    resources: [
      { title: "20th Century Historical Archive", type: "link", url: "https://www.historyarchives.org" },
      { title: "Chicago Citation Guide", type: "pdf", url: "/resources/chicago-style.pdf" },
      { title: "Historical Methods - Research Guide", type: "video", url: "/resources/historical-methods.mp4" }
    ],
    totalWords: 2000
  }
};

/**
 * Get assignment data by ID
 * In a real app, this would fetch from a database
 */
export async function getAssignment(id: string): Promise<Assignment | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Return the assignment if it exists
  return assignmentDatabase[id] || null;
}

/**
 * Get draft content for an assignment
 * In a real app, this would fetch from a database
 */
export async function getAssignmentDraft(assignmentId: string): Promise<string> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Return mock draft content
  return localStorage.getItem(`draft-${assignmentId}`) || '';
}

/**
 * Save draft content for an assignment
 * In a real app, this would save to a database
 */
export async function saveAssignmentDraft(assignmentId: string, content: string): Promise<void> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Save to local storage (in a real app this would be a server API call)
  localStorage.setItem(`draft-${assignmentId}`, content);
}

/**
 * Submit an assignment
 * In a real app, this would send to a backend API
 */
export async function submitAssignment(assignmentId: string, content: string): Promise<{ success: boolean }> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simulate submission
  console.log(`Assignment ${assignmentId} submitted with content length: ${content.length}`);
  return { success: true };
} 