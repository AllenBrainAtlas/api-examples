# Copyright 2012 Allen Institute for Brain Science
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# This script loads an R object computed via the `preprocessData` method and runs
# a standard Weighted Gene Co-expression Network Analysis on it.  This involves
# clustering probes based on their correlation scores into modules.  First, make 
# sure the necessary libraries are loaded.
library(WGCNA)
library(RJSONIO)

# Load the preprocessed R data for donor 9861.
load("9861.RData")

# WGCNA recommends applying a soft threshold to the correlation matrix used for
# network analysis.  The following code will help pick a soft threshold, the output
# of which led to choosing a power of 10.  
#     powers = c(6,7,8,9,10,11,12,13,14)
#     pickSoftThreshold(datExpr,networkType="signed",powerVector=powers)
thresholdPower = 10

# Run the `blockwiseModules` method, which does all of the WGCNA analysis in one step.
# The data set is very large, so the analysis will require at least 6GB of memory.
# `blockwiseModules` can be run on separate blocks of genes, however after parallel 
# analysis it must attempt to merge the modules it finds together.  For simplicity, 
# the following takes a random 10000 genes and runs `blockwiseModules` on all of those 
# genes at once.
numRows = 10000
datExprR = datExpr[sample(1:nrow(datExpr), numRows, replace=FALSE),]
net = blockwiseModules(t(datExprR),power=thresholdPower,networkType="signed",maxBlockSize=numRows)

# Plot the cluster results.  The plot will show a dendrogram resulting from agglomerative gene
# clustering.  That dendrogram is then segmented into modules, the colors of which are 
# shown below the dendrogram.
moduleColorsAutomatic = labels2colors(net$colors)
mColors = moduleColorsAutomatic[net$blockGenes[[1]]]

x11()
plotDendroAndColors(net$dendrograms[[1]], colors=mColors, dendroLabels=FALSE, 
                    groupLabels=c("Module colors"), addGuide=TRUE,
                    main="H0351.2001 Cluster Dendrogram")
                             

# Plot the principal module eigengene.  This is the expression pattern that represents 
# the majority of the variance within the data.  In this case, it roughly depicts 
# differential expression between cortical and subcortical structures.  
module = 1
me = net$MEs[[module]]

# Sort the downloaded order values to build a sample index order.
order = order(sampleInfo$order)
color = sampleInfo$color

# Generate the plot.
x11()
barplot(me[order], col=color[order], border=NA, 
        main="First Module Eigengene Expression Pattern")

# Save both figures to a PDF as well.
pdf("9861.pdf", width=6, height=3, pointsize=8)

plotDendroAndColors(net$dendrograms[[1]], colors=mColors, dendroLabels=FALSE, 
                    groupLabels=c("Module colors"), addGuide=TRUE,
                    main="H0351.2001 Cluster Dendrogram")
                    
barplot(me[order], col=color[order], border=NA, 
        main="First Module Eigengene Expression Pattern")
        
dev.off()
